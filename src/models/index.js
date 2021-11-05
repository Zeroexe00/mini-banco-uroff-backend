import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/index.js`)[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,
      retry: {
        match: [Sequelize.ConnectionError]
      }
    }
  );
}

const models = Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
    .map((file) => {
      const model = require(path.join(__dirname, file)).default;

      return {
        [model.name]: model.init(sequelize, Sequelize)
      };
    })
);

for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' &&
    models[model].associate(models);
}

const db = {
  ...models,
  sequelize,
  Sequelize
};

module.exports = db;
