import Sequelize from 'sequelize';

export default class Transaction extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
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
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id'
    });
  }
}
