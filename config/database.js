
const {sequelize } = require('sequelize');

module.exports = new Sequelize ('chopstore','root','', {
 host: 'localhost',
 dialect:'mysql'

});