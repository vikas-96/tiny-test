module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Cats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      catname: {
        type: Sequelize.STRING,
      },
      catage: {
        type: Sequelize.STRING,
      },
      catcolor: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Cats");
  },
};
