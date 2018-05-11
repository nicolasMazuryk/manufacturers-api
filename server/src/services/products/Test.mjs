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
            fieldName: ['required', 'trim'],
            isGroup: 'boolean',
            primaryTableKey: ['required', { list_length: 2 }],
            params: [
              'required',
              {
                nested_object: {
                  table: ['required', 'trim'],
                  column: ['required', 'trim'],
                  where: [
                    'required',
                    {
                      nested_object: {
                        column: ['required', 'trim'],
                        operator: ['required', 'trim'],
                        value: ['trim'],
                        // value: {
                        //   required_if: {
                        //     'data/params/where/foreignColumn': [],
                        //   },
                        // },
                        foreignColumn: [{ list_length: 2 }],
                        // foreignColumn: {
                        //   required_if: { 'data/params/where/value': '' },
                        //   list_length: [2],
                        // },
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

  async execute({ data: { fieldName, isGroup, params } }) {
    const sequelize = this.context.connection;
    const schema = sequelize.options.schema;
    const { QueryTypes } = sequelize;
    const { primaryTableKey, table, column, where } = params;
    let result;

    if (isGroup) {
      result = await sequelize.query(
        `SELECT t1.${column} as value
          FROM ${schema}.${table} as t1
          INNER JOIN  ${schema}.${where.foreignColumn[0]} as t2
            ON t1.${where.column} = t2.${where.foreignColumn[1]}`,
        { type: QueryTypes.SELECT },


      // result = await sequelize.query(
      //   `SELECT ${schema}.${table}.${column} as value
      // FROM ${schema}.${table}
      // LEFT JOIN ${schema}.${where.foreignColumn[0]} ON ${schema}.${table}.${
      //     where.column
      //   } ${where.operator} ${schema}.${where.foreignColumn[0]}.${
      //     where.foreignColumn[1]
      //   }`,
      //   { type: QueryTypes.SELECT },
      );
    } else {
      // language=POSTGRES-PSQL
      result = await sequelize.query(
        `SELECT ${column} as value
      FROM ${schema}.${table}
      WHERE ${where.column} ${where.operator} ${where.value}`,
        { type: QueryTypes.SELECT },
      );
    }

    return {
      data: {
        fieldName,
        test: result.length ? result[0].value : 'NO_RESULT',
      },
    };
  }
}
