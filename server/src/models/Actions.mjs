import Sequelize from 'sequelize';
import crypto from 'crypto';
import db from '../db';
import Base from './Base';

const { DataTypes } = Sequelize;

export default class Action extends Base {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        hash: { type: DataTypes.STRING, allowNull: false, unique: true },
        type: {
          type: DataTypes.ENUM,
          values: ['confirmEmail', 'resetPassword'],
        },
        data: { type: DataTypes.JSON },
      },
      {
        sequelize,
        paranoid: true,
        tableName: 'actions',
      },
    );
  }

  run(data) {
    return this[this.type](data);
  }

  async confirmEmail() {
    const { User } = db.models;
    const user = await User.findOne({ where: { id: this.data.userId } });

    user.status = User.STATUS.ACTIVE;

    return user.save();
  }

  async resetPassword(externalData) {
    const { User } = db.models;

    const user = await User.findOne({ where: { id: this.data.userId } });

    user.password = externalData.password;

    return user.save();
  }

  static generateHash() {
    return crypto.randomBytes(20).toString('hex');
  }
}
