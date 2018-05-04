import Base from '../Base';
import dbManager from '../dbManager';

export default class Connect extends Base {
  static get validationRules() {
    return {
      data: [
        'required',
        {
          nested_object: {
            host: ['required', 'trim'],
            port: ['required', 'trim'],
            database: ['required', 'trim'],
            username: ['required', 'trim'],
            password: ['required', 'trim'],
            schema: ['required', 'trim'],
          },
        },
      ],
    };
  }

  async execute({ data }) {
    const connection = dbManager.connect(data, this.context);

    return {
      data: {
        connected: !!connection,
      },
    };
  }
}
