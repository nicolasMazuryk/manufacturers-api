'use strict';

module.exports = {
  up: (QI, DT) => {
    return QI.createTable('users', {
      id: {
        type: DT.UUID,
        defaultValue: DT.UUIDV4,
        primaryKey: true,
      },
      email: { type: DT.STRING, unique: true },
      username: { type: DT.STRING },
      firstname: { type: DT.STRING },
      lastname: { type: DT.STRING },
      password: { type: DT.STRING },
      status: {
        type: DT.ENUM,
        values: ['NEW', 'ACTIVE', 'BLOCKED'],
        defaultValue: 'ACTIVE',
      },
      role: {
        type: DT.ENUM,
        values: ['USER', 'ADMIN'],
        defaultValue: 'USER',
      },
      createdAt: { type: DT.DATE },
      updatedAt: { type: DT.DATE },
      deletedAt: { type: DT.DATE },
    });
  },

  down: QI => {
    return QI.dropTable('users');
  },
};
