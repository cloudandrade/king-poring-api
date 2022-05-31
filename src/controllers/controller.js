const jwt = require('jsonwebtoken');
//Usuario Model
const Usuario = require('../Models/UsuarioModel');
const { PERFIL } = require('../helpers/constantHelper');
const bcrypt = require('bcryptjs');

exports.userLogin = async (req, res) => {
  Usuario.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((usuario) => {
      if (!usuario) {
        return res
          .status(404)
          .send(
            'Falha de Login,nenhum usuário com este email foi encontrado'
          );
      }

      /* let passwordIsValid = bcrypt.compareSync(req.body.senha, usuario.senha);
			if (!passwordIsValid) {
				return res.status(401).send({
					auth: false,
					accessToken: null,
					reason: 'Senha Invalida!',
				});
			} */

      if (req.body.senha !== usuario.senha) {
        return res.status(401).send({
          auth: false,
          accessToken: null,
          reason: 'Senha Invalida!',
        });
      }

      let token = jwt.sign(
        { id: usuario.id },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400, // expires in 24 hours
        }
      );

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
};

exports.userFindAll = async (req, res) => {
  const result = await Usuario.findAll();
  console.log(result);
  res.json(result);
};

exports.userCreateAdmin = (req, res) => {};

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

  /*Pessoa.create({
      //atributos que vamos inserir
      nome: 'Jhon Doe',
      idade: 28,
      cpf: '89400098400'
  })*/
};

exports.testAuthenticated = async (req, res) => {
  const result = await Usuario.findAll();
  console.log(result);
  res.json(result);
};
