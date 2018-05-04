import app from './app';
import logger from './logger';
import config from './config';

app.listen(config.port);
logger.info(`APP STARTING AT PORT ${config.port}`);
