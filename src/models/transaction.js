import Sequelize from 'sequelize';

export default class Transaction extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      userIdReceiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userIdSender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      tableName: 'transactions',
      modelName: 'transaction',
      sequelize
    });
  }
}
