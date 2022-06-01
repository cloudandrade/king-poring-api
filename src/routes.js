const express = require('express');

const router = express.Router();

const controller = require('../src/controllers/controller');

const {
  checkAuthorization,
  checkAdminAuthorization,
} = require('../src/services/authService');

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

router.get('/users', checkAdminAuthorization, controller.userFindAll);

router.post('/users/comprador', controller.userCreateBuyer);

router.post('/users/admin', controller.userCreateAdmin);

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

router.post('/auth', controller.userLogin);

// rota protegida, sem o token não passa => adicionar o token em auth => bearer token
router.get(
  '/auth/test',
  checkAuthorization,
  controller.testAuthenticated
);

router.get(
  '/auth/test/admin',
  checkAdminAuthorization,
  controller.testAuthenticated
);

module.exports = router;
