const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./src/config/sequelizeConfig');


const cors = require('cors');

const Logger = require('./src/utils/logger');
const logger = new Logger('Server');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const {swaggerOptions} = require('./src/config/swaggerConfig')

logger.debug("## Start Checking Environment Variables ##")
logger.debug("API_PORT: " + process.env.API_PORT)
logger.debug("API_HOST: " + process.env.API_HOST)
logger.debug("DBNAME: " + process.env.DBNAME)
logger.debug("DBUSER: " + process.env.DBUSER)
logger.debug("DBPASS: " + process.env.DBPASS)
logger.debug("DBHOST: " + process.env.DBHOST)
logger.debug("DBPORT: " + process.env.DBPORT)
logger.debug("JWT_SECRET: " + process.env.JWT_SECRET)
logger.debug("LOG_SERVICE_TYPE: " + process.env.LOG_SERVICE_TYPE)
logger.debug("## End Checking Environment Variables ##")

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.API_PORT || 8000;

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//configuring swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

logger.debug("## Swagger Configuration Done! ##")
logger.debug(`Swagger documentation available on ${process.env.API_HOST}:${process.env.API_PORT}/api-docs`)



//ROUTES
app.use('/', require('./src/routes'));


//SERVER
app.listen(
	 PORT,
    async () => {
        if(process.env.LOG_SERVICE_TYPE === 'LOG' || process.env.LOG_SERVICE_TYPE === 'BOTH'){
            logger.info(`Servidor Iniciado na Porta: ${PORT}`.bgBlue)
        }else{
            logger.info(`Servidor Iniciado na Porta: ${PORT}`) 
        }
        
    }
	
);