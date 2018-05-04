import Base from '../Base';

export default class dashboardInfo extends Base {
  async execute() {
    const sequelize = this.context.connection;
    const schema = sequelize.options.schema;
    const { QueryTypes } = sequelize;
    // language=POSTGRES-PSQL
    const tableList = await sequelize.query(
      `SELECT table_name as table
      FROM information_schema.tables 
      WHERE table_schema='${schema}'`,
      { type: QueryTypes.SELECT },
    );

    const tableTree = {};
    for (const { table } of tableList) {
      // language=POSTGRES-PSQL
      const columns = await sequelize.query(
        `SELECT column_name as column
        FROM information_schema.columns 
        WHERE table_schema = '${schema}' 
        AND table_name = '${table}'`,
        { type: QueryTypes.SELECT },
      );

      tableTree[table] = columns.map(({ column }) => column);
    }

    return {
      data: tableTree,
      connected: true,
    };
  }
}
