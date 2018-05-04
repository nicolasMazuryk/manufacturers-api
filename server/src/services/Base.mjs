import LIVR from 'livr';
import extraRules from 'livr-extra-rules';
import Exception from './Exception';
import rules from './validationRules';
import status from 'http-status-codes';

LIVR.Validator.registerDefaultRules(extraRules);
LIVR.Validator.registerDefaultRules(rules);

export default class Base {
  constructor(args) {
    if (!args.context) throw new Error('CONTEXT_REQUIRED');
    this.context = args.context;
  }

  async run(params) {
    await this.checkPermissions();
    const cleanParams = await this.validate(params);
    return this.execute(cleanParams);
  }

  async checkPermissions() {
    const role = this.context.role;
    const permissions = this.constructor.requiredPermissions;

    if (permissions && !permissions.includes(role)) {
      throw new Exception({
        code: 'PERMISSION_DENIED',
        status: status.FORBIDDEN,
        fields: { role },
      });
    }
  }

  validate(data) {
    // Cache validatord
    const validator =
      this.constructor.validator ||
      new LIVR.Validator(this.constructor.validationRules).prepare();
    this.constructor.validator = validator;

    return this._doValidationWithValidator(data, validator);
  }

  doValidation(data, rules) {
    const validator = new LIVR.Validator(rules).prepare();
    return this._doValidationWithValidator(data, validator);
  }

  _doValidationWithValidator(data, validator) {
    const result = validator.validate(data);

    if (!result) {
      const exception = new Exception({
        code: 'FORMAT_ERROR',
        status: status.BAD_REQUEST,
        fields: validator.getErrors(),
      });

      return Promise.reject(exception);
    }

    return Promise.resolve(result);
  }
}
