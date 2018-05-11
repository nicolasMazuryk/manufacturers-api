import Sequelize from 'sequelize';
import config from './config';

import User from './models/User';
import Product from './models/Product';
// import Action from './models/Actions';

const sequelize = new Sequelize({
  ...config.postgres,
  operatorsAliases: Sequelize.Op,
});

User.init(sequelize);
Product.init(sequelize);
// Action.init(sequelize);

const { models } = sequelize;

for (const modelName in models) {
  const model = models[modelName];
  if ('associate' in model) {
    model.associate(models, sequelize);
  }
}

sequelize.sync();

// Only for Development purposes
import dbManager from './services/dbManager';
dbManager.connect(
  {
    host: '127.0.0.1',
    port: '5434',
    database: 'aterodb',
    username: 'atero_admin',
    password: 'eci32e3932sdm',
    schema: 'testing',
  },
  { id: 5 },
);

export default sequelize;
