//Usuario Model
const Usuario = require('../Models/UsuarioModel');
const { PERFIL } = require('../helpers/constantHelper');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../services/authService');
const { mountWhereParams } = require('../helpers/dbHelper');

/**
 * ###### userLogin - ##########################################################
 * @param {*} req
 * @param {*} res
 */
exports.userLogin = async (req, res) => {
  Usuario.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (usuario) => {
      if (!usuario) {
        return res
          .status(404)
          .send(
            'Falha de Login,nenhum usuário com este email foi encontrado'
          );
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.senha,
        usuario.senha
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          accessToken: null,
          reason: 'Senha Invalida!',
        });
      }

      let token = await generateToken(usuario);

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
      res.status(500).send({
        auth: true,
        accessToken: token,
        reason: 'Internal Server Error: ' + err.message,
      });
    });
};

/**
 * ###### userFindAll - ########################################################
 * @param {*} req
 * @param {*} res
 */
exports.userFindAll = async (req, res) => {
  let params = await mountWhereParams(req.query);
  console.log('mounted where');
  console.log(JSON.stringify(params));
  const result = await Usuario.findAll({ where: params,  raw: true });
  console.log(result);
  res.json(result);
};

/**
 * ###### userDetailOne - ########################################################
 * @param {*} req
 * @param {*} res
 */
 exports.userDetailOne = async (req, res) => {

  let params = await mountWhereParams(req.params);

  const result = await Usuario.findOne({ where: params, raw: true });
  console.log(result);
  res.json(result);
};

/**
 * ###### userCreateAdmin - ####################################################
 * @param {*} req
 * @param {*} res
 */
exports.userCreateAdmin = (req, res) => {
  let perfil = null;

  if (req.body.tipoPerfil === 'ADMIN') {
    perfil = PERFIL.ADMIN;
  } else if (req.body.tipoPerfil === 'FUNCIONARIO') {
    perfil = PERFIL.FUNCIONARIO;
  } else if (req.body.tipoPerfil === 'PARCEIRO') {
    perfil = PERFIL.PARCEIRO;
  } else {
    //caso não seja nenhum dos perfis
    perfil = PERFIL.COMPRADOR;
  }

  let newUser = {
    perfilId: perfil,
    nome: req.body.nome,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha, 8),
    telefone: req.body.telefone,
    cpf: req.body.cpf,
    dataNascimento: req.body.dataNascimento,
  };

  Usuario.create(newUser)
    .then(() => {
      return res.status(200).send('pessoa criada');
    })
    .catch((err) => {
      console.log('err: ' + err);
      console.log('não foi possível criar o usuario');
      return res.status(500).send('Erro ao criar usuario');
    });
};

/**
 * ###### userCreateBuyer - ####################################################
 * @param {*} req
 * @param {*} res
 */
exports.userCreateBuyer = (req, res) => {
  let newUser = {
    perfilId: PERFIL.COMPRADOR,
    nome: req.body.nome,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha, 8),
    telefone: req.body.telefone,
    cpf: req.body.cpf,
    dataNascimento: req.body.dataNascimento,
  };

  Usuario.create(newUser)
    .then(() => {
      return res.status(200).send('pessoa criada');
    })
    .catch((err) => {
      console.log('err: ' + err);
      console.log('não foi possível criar o usuario');
      return res.status(500).send('Erro ao criar usuario');
    });
};

/**
 * ###### testAuthenticated - ##########################################################
 * @param {*} req
 * @param {*} res
 */
exports.testAuthenticated = async (req, res) => {
  const result = await Usuario.findAll();
  console.log(result);
  res.json(result);
};
