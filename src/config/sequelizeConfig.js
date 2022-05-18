const Sequelize = require('sequelize');
const Logger = require('../utils/logger');
//conexão com o banco de dados mysql
const logger = new Logger('Server');

logger.debug("## Database configuration ##")
        
        
const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER , process.env.DBPASS, {
	host: process.env.DBHOST,
	port: process.env.DBPORT,
	dialect: 'mysql',
	logging: process.env.DBLOGGING === true ? console.log : false
});

sequelize
	.authenticate()
	.then(() => {
		logger.info('Banco de dados conectado com sucesso.');
	})
	.catch((err) => {
		logger.error('Não foi possível se conectar ao banco de dados:', err);
	});
	
	logger.debug("## Database configuration Done! ##")

module.exports = {
	Sequelize,
	sequelize,
};
