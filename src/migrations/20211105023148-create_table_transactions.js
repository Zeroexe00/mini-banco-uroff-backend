module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userIdSender: Sequelize.INTEGER,
    userIdReceiver: Sequelize.INTEGER,
    amount: Sequelize.INTEGER,
  }),
  // eslint-disable-next-line
  down: (queryInterface, Sequelize) => queryInterface.dropTable('transactions', {

  })
  // eslint-disable-next-line eol-last
};