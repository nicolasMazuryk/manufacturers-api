import Base from '../Base';
import X from '../Exception';
import status from 'http-status-codes';

export default class Test extends Base {
  static get validationRules() {
    return {
      data: [
        'required',
        {
          nested_object: {
            fieldName: ['required', 'trim', 'to_lc'],
            params: [
              'required',
              {
                nested_object: {
                  table: ['required', 'trim', 'to_lc'],
                  column: ['required', 'trim', 'to_lc'],
                  where: [
                    'required',
                    {
                      nested_object: {
                        column: ['required', 'trim', 'to_lc'],
                        operator: ['required', 'trim', 'to_lc'],
                        value: ['required', 'trim', 'to_lc'],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    };
  }

  async execute({ data: { fieldName, params } }) {
    const sequelize = this.context.connection;
    const { QueryTypes } = sequelize;
    const { table, column, where } = params;

    // language=POSTGRES-PSQL
    const result = await sequelize.query(
      `SELECT ${column} as value
      FROM ${table}
      WHERE ${where.column} ${where.operator} ${where.value}`,
      { type: QueryTypes.SELECT },
    );

    return {
      data: {
        fieldName,
        test: result.length ? result[0].value : 'NO_RESULT',
      },
    };
  }
}
