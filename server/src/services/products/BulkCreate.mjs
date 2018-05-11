import Base from '../Base';
import Product from '../../models/Product';
import X from '../Exception';
import status from 'http-status-codes';

export default class BulkCreate extends Base {
  static get validationRules() {
    return {
      data: [
        'required',
        {
          nested_object: {
            isGroup: 'boolean',
            primaryTableKey: ['required', { list_length: 2 }],
            params: [
              'required',
              {
                list_of_objects: [
                  {
                    name: ['required', 'trim'],
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
                ],
              },
            ],
          },
        },
      ],
    };
  }

  async execute({ data: { isGroup, primaryTableKey, params } }) {
    const sequelize = this.context.connection;
    const schema = sequelize.options.schema;
    const { QueryTypes } = sequelize;

    const [primaryTable, primaryKey] = primaryTableKey;
    // already joined tables list
    const joinedTables = [`${schema}.${primaryTable}`];

    let selectStr = `SELECT `;
    let fromStr;
    let joinsStr = '';

    params.forEach((param, idx) => {
      const { name, table, column, where } = param;

      if (where.foreignColumn.length) {
        const joinTable = `${schema}.${where.foreignColumn[0]}`;

        if (joinedTables.includes(joinTable)) {
          selectStr += `${
            idx ? ',' : ''
          } ${schema}.${table}.${column} as ${name}`;
        } else {
          selectStr += `${
            idx ? ',' : ''
          } ${schema}.${table}.${column} as ${name}`;
          joinsStr += ` LEFT JOIN ${joinTable}
          ON ${schema}.${table}.${where.column} = ${joinTable}.${
            where.foreignColumn[1]
          }`;
        }
      }

      if (where.value) {
      }

      if (!where.foreignColumn.length && !where.value) {
        selectStr += `${
          idx ? ',' : ''
        } ${schema}.${table}.${column} as ${name}`;
      }

      if (!idx) {
        fromStr = `FROM ${schema}.${primaryTable}`;
      }
      // joinsStr += ` INNER JOIN ${schema}.${
      //   where.foreignColumn[0]
      // } as ${joinedTableAlias}
      //       ON ${tableAlias}.${where.column} = ${joinedTableAlias}.${
      //   where.foreignColumn[1]
      // }`;
    });

    const query = [selectStr, fromStr, joinsStr].join(' ');

    let result;

    if (isGroup) {
      result = await sequelize.query(query, { type: QueryTypes.SELECT });
    } else {
      // // language=POSTGRES-PSQL
      // result = await sequelize.query(
      //   `SELECT ${column} as value
      // FROM ${schema}.${table}
      // WHERE ${where.column} ${where.operator} ${where.value}`,
      //   { type: QueryTypes.SELECT },
      // );
    }

    try {
      result = result.map(item => (item.manufacturerId = 3));

      await Product.bulkCreate(result);
    } catch (err) {
      console.log(err);
    }

    return {
      data: {
        // fieldName,
        test: result.length ? result[0].value : 'NO_RESULT',
      },
    };
  }
}
