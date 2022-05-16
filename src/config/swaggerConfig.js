//SWAGGER OPTIONS AND SERVE
const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'King-Poring API',
			description: 'GeekStore Service API Information',
			servers: ['http://localhost:8000'],
			tags: [
				{
					name: 'Auth',
					description: 'Informações de autenticação',
				},
				{
					name: 'Usuários',
					description: 'Gerenciamento de usuários',
				},
                {
					name: 'Health',
					description: 'Checa o status da aplicação',
				},
			],
		},
	},
	//['.routes/*.js] -- caso tivessem varios arquivos
	apis: ['./src/routes.js'],
};

module.exports = {swaggerOptions}