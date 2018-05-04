import util from 'util';
import logger from './logger';
import Exception from './services/Exception';
import status from 'http-status-codes';

const inspect = data => util.inspect(data, { showHidden: false, depth: null });

const defaultParamsBuilder = () => ({});
const defaultContextBuilder = req =>
  cloneDeep({
    ...(req.user || {}),
    ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
  });

export async function runService(serviceClass, { context = {}, params = {} }) {
  const startTime = Date.now();
  const actionName = serviceClass.name;

  try {
    const result = await new serviceClass({
      context,
    }).run(params);

    logRequest({
      type: 'info',
      actionName,
      params: inspect(params),
      result: inspect(result),
      startTime,
      userId: context.id,
    });

    return result;
  } catch (error) {
    if (error instanceof Exception) {
      logRequest({
        type: 'info',
        actionName,
        params: inspect(params),
        result: error,
        startTime,
      });
    } else {
      logRequest({
        type: 'error',
        actionName,
        params,
        result: error,
        startTime,
      });
    }

    throw error;
  }
}

export function makeServiceRunner(
  serviceClass,
  paramsBuilder = defaultParamsBuilder,
  contexBuilder = defaultContextBuilder,
) {
  return async function serviceRunner(req, res) {
    const resultPromise = runService(serviceClass, {
      params: paramsBuilder(req, res),
      context: contexBuilder(req, res),
    });

    return renderPromiseAsJson(req, res, resultPromise);
  };
}

export async function renderPromiseAsJson(req, res, promise) {
  try {
    const data = await promise;

    data.status = 1;

    return res.status(status.OK).send(data);
  } catch (error) {
    if (error instanceof Exception) {
      res.status(error.status).send({
        status: 0,
        error: error.toHash(),
      });
    } else {
      logger.error({
        REQUEST_URL: req.url,
        REQUEST_PARAMS: req.params,
        REQUEST_BODY: req.body,
        ERROR_STACK: error.stack,
      });

      res.status(status.INTERNAL_SERVER_ERROR).send({
        status: 0,
        error: {
          code: 'SERVER_ERROR',
          message: 'Please, contact your system administartor!',
        },
      });
    }
  }
}

function cloneDeep(data) {
  return JSON.parse(JSON.stringify(data));
}

function logRequest({ type, actionName, params, result, startTime, userId }) {
  defaultLogger(type, {
    service: actionName,
    runtime: Date.now() - startTime,
    params,
    result,
    userId,
  });
}

function defaultLogger(type, data) {
  const logMethodName =
    {
      error: 'error',
      info: 'info',
    }[type && type.toLowerCase()] || 'debug';

  logger[logMethodName](data);
}
