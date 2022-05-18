const express = require('express');
const router = express.Router();

//MOCK
const Usuario = require('./Models/UsuarioModel')


/**
 * @swagger
 * /health:
 *  get:
 *    tags: ["health"]
 *    description: Retorna se a aplicação está online
 *    responses:
 *      '200':
 *        description: Geek Store Api server online - Health check complete!
 */
router.get('/health', async (req, res) => {
	res.send('Geek Store Api server online - Health check complete!');
});

router.get('/users', async (req, res) => {
	const result = await Usuario.findAll();
	console.log(result)
	res.json(result);
});

/**
 * @swagger
 * /auth:
 *  post:
 *    tags: ["Auth"]
 *    description: Verifica as credenciais de acesso a aplicação
 *    responses:
 *      '200':
 *        description: Valicação bem sucedida
 */


module.exports = router;
