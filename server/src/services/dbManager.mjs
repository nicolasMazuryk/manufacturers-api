import Sequelize from 'sequelize';

const connections = {};

const dbManager = {
  connect: function(config, context) {
    if (connections[context.id]) {
      return connections[context.id];
    }
    // TODO: handle possible errors
    const connection = new Sequelize({
      ...config,
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      operatorsAliases: Sequelize.Op,
    });

    connections[context.id] = connection;

    return { connection };
  },

  isConnected(userId) {
    return !!connections[userId];
  },

  getConnection(userId) {
    return connections[userId];
  },

  diconnect(userId) {
    delete connections[userId];
    return userId;
  },
};

export default dbManager;
