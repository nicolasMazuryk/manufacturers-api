import Sequelize from 'sequelize';

const { Model, Op } = Sequelize;

export default class Base extends Model {
  static findById(id) {
    return this.findOne({
      where: { id: { [Op.eq]: id } },
    });
  }

  static findByUserId(id) {
    return this.findAll({
      where: { userId: { [Op.eq]: id } },
    });
  }

  static findByIdAndUserId(id, id) {
    return this.findOne({
      where: { id: { [Op.eq]: id }, userId: { [Op.eq]: id } },
    });
  }
}
