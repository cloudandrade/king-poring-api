const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors');

const Logger = require('./src/utils/logger');
const logger = new Logger('King Poring');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const {swaggerOptions} = require('./src/config/swaggerConfig')



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

//ROUTES
app.use('/', require('./src/routes'));


//SERVER
app.listen(
	 PORT,
    () => {
        if(process.env.LOG_SERVICE_TYPE === 'LOG' || process.env.LOG_SERVICE_TYPE === 'BOTH'){
            logger.info(`Servidor Iniciado na Porta: ${PORT}`.bgBlue)
        }else{
            logger.info(`Servidor Iniciado na Porta: ${PORT}`) 
        }
        
    }
	
);