const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { checkAuthorization } = require('../src/services/authService');


//Usuario Model
const Usuario = require('./models/UsuarioModel')


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

 router.post('/auth', async (req, res) => {
	

	Usuario.findOne({
		where: {
		  email: req.body.email
		}
	  })
		.then((usuario) => {
			if (!usuario) {
				return res.status(404).send('Falha de Login,nenhum usuário com este email foi encontrado');
			}

			/* let passwordIsValid = bcrypt.compareSync(req.body.senha, usuario.senha);
			if (!passwordIsValid) {
				return res.status(401).send({
					auth: false,
					accessToken: null,
					reason: 'Senha Invalida!',
				});
			} */

			
			if(req.body.senha !== usuario.senha){
				return res.status(401).send({
					auth: false,
					accessToken: null,
					reason: 'Senha Invalida!',
				});
			}



			let token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET , {
				expiresIn: 86400, // expires in 24 hours
			});

			res.status(200).send({
				auth: true,
				accessToken: token,
				payload: {
					id: usuario._id,
					perfil: usuario.perfil_id,
					nome: usuario.nome,
					email: usuario.email,
				},
			});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Internal Server Error ' + err);
		});
});	

// rota protegida, sem o token não passa => adicionar o token em auth => bearer token
router.get('/auth/test', checkAuthorization, async (req, res) => {
	const result = await Usuario.findAll();
	console.log(result)
	res.json(result);
});

module.exports = router;
