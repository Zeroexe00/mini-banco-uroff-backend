import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      rut: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currentBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      tableName: 'users',
      modelName: 'user',
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      },
      sequelize,
      paranoid: true
    });
  }

  static associate(models) {
    //
  }
}
