const Sequelize = require('sequelize');
//Conexão com o banco de dados MySql
const sequelize = new Sequelize('postapp', 'root', '123@456', {
    host: "127.0.0.1", port: "3362",
    dialect: "mysql"
}); 

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}