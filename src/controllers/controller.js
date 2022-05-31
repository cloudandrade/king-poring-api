const jwt = require('jsonwebtoken');
//Usuario Model
const Usuario = require('./models/UsuarioModel');


exports.userLogin = (req, res) => {
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

exports.userFindAll = (req, res) => {
  const result = await Usuario.findAll();
  console.log(result);
  res.json(result);
};

exports.userCreateAdmin = (req, res) => {};

exports.userCreateBuyer = (req, res) => {};

exports.testAuthenticated = (req, res) => {
  const result = await Usuario.findAll();
  console.log(result);
  res.json(result);
}
