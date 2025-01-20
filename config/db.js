const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'db/database.sqlite')
})

module.exports = sequelize;  // Export the Sequelize instance