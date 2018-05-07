import Sequelize from 'sequelize';

const { DataTypes, Model, Op } = Sequelize;

import config from '../config';

export default class Product extends Model {
  static get TYPE() {
    return {
      PRODUCT: 'PRODUCT',
      OPTION: 'OPTION',
      ACCESSORY: 'ACCESSORY',
      PART: 'PART',
    };
  }

  static init(sequelize) {
    this.db = sequelize;
    super.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        manufacturerId: {
          field: 'manufacturer_id',
          type: DataTypes.BIGINT,
          allowNull: false,
        },

        catSubAssocId: {
          field: 'cat_sub_assoc_id',
          type: DataTypes.BIGINT,
          allowNull: true,
        },

        productModelNumber: {
          field: 'product_model_number',
          type: DataTypes.STRING,
          allowNull: false,
        },

        productHash: {
          field: 'product_hash',
          type: DataTypes.STRING,
          allowNull: true,
        },

        type: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        baseName: {
          field: 'base_name',
          type: DataTypes.STRING,
          allowNull: true,
        },

        upc: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        depth: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },

        height: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },

        width: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },

        diameter: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },

        shippingWeight: {
          field: 'shipping_weight',
          type: DataTypes.DECIMAL,
          allowNull: true,
        },

        unitOfMeasure: {
          field: 'unit_of_measure',
          type: DataTypes.STRING,
          allowNull: true,
        },

        uomMeasurement: {
          field: 'uom_measurement',
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },

        freightClass: {
          field: 'freight_class',
          type: DataTypes.INTEGER,
          allowNull: true,
        },

        freightCode: {
          field: 'freight_code',
          type: DataTypes.STRING,
          allowNull: true,
        },

        taxCode: {
          field: 'tax_code',
          type: DataTypes.STRING,
          allowNull: true,
        },

        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },

        msrp: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },

        map: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },

        utilityInfo: {
          field: 'utility_info',
          type: DataTypes.TEXT,
          allowNull: true,
        },

        sku: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        productFamily: {
          field: 'product_family',
          type: DataTypes.STRING,
          allowNull: true,
        },

        leadTime: {
          field: 'lead_time',
          type: DataTypes.INTEGER,
          allowNull: true,
        },

        variantGroup: {
          field: 'variant_group',
          type: DataTypes.STRING,
          allowNull: true,
        },

        optionFlag: {
          field: 'option_flag',
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },

        createdBy: {
          field: 'created_by',
          type: DataTypes.BIGINT,
          allowNull: true,
        },

        updatedBy: {
          field: 'updated_by',
          type: DataTypes.BIGINT,
          allowNull: true,
        },

        deletedBy: {
          field: 'deleted_by',
          type: DataTypes.BIGINT,
          allowNull: true,
        },
      },
      {
        tableName: 'product',
        freezeTableName: true,
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

  static generateHash(string) {}

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
