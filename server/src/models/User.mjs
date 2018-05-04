import Sequelize from 'sequelize';
import crypto from 'crypto';

const { DataTypes, Model, Op } = Sequelize;

import config from '../config';

const symbols =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-=?';

export default class User extends Model {
  static get ROLE() {
    return {
      MANUFACTURER: 'MANUFACTURER',
      USER: 'USER',
      ADMIN: 'ADMIN',
    };
  }

  static get STATUS() {
    return {
      NEW: 'NEW',
      ACTIVE: 'ACTIVE',
      BLOCKED: 'BLOCKED',
    };
  }

  static init(sequelize) {
    this.db = sequelize;
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: { type: DataTypes.STRING, unique: true },
        firstName: {
          field: 'first_name',
          type: DataTypes.STRING,
        },
        lastName: {
          field: 'last_name',
          type: DataTypes.STRING,
        },
        emailConfirmed: {
          field: 'email_confirmed',
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        passwordHash: {
          field: 'password_hash',
          type: DataTypes.STRING,
          set(value) {
            this.setDataValue('password', User.generateHash(value));
          },
        },
        // status: {
        //   type: DataTypes.ENUM,
        //   values: Object.values(this.STATUS),
        //   defaultValue: this.STATUS.NEW,
        // },
        role: {
          field: 'user_role',
          type: DataTypes.ENUM,
          values: Object.values(this.ROLE),
          defaultValue: this.ROLE.MANUFACTURER,
        },
        lastAccessed: {
          field: 'last_accessed',
          type: DataTypes.DATE,
        },
        createdBy: {
          field: 'created_by',
          type: DataTypes.BIGINT,
        },
        updatedBy: {
          field: 'updated_by',
          type: DataTypes.BIGINT,
        },
        deletedBy: {
          field: 'deleted_by',
          type: DataTypes.BIGINT,
        },
      },
      {
        tableName: 'application_user',
        paranoid: true,
        underscored: true,
        schema: config.postgres.schema,
        sequelize,
      },
    );
  }

  checkPassword(password) {
    // return this.get('password') === User.generateHash(password);
    return true;
  }

  static generatePassword() {
    return Array(10)
      .fill(1)
      .map(() => symbols[Math.floor(Math.random() * symbols.length)])
      .join('');
  }

  static generateHash(string) {
    return crypto
      .createHmac('sha256', config.secret)
      .update(string)
      .digest('hex');
  }

  static findById(id) {
    return this.findOne({
      where: { id,
        // status: { [Op.ne]: this.STATUS.BLOCKED }
        },
    });
  }

  static list() {
    return this.findAll({
      where: { role: { [Op.ne]: this.ROLE.ADMIN } },
    });
  }
}
