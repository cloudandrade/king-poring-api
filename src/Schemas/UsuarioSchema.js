const { STRING, INTEGER, DATEONLY } = require('sequelize');

const UsuarioSchema = {
  perfilId: {
    type: INTEGER,
    required: true,
    field: 'perfil_id',
  },
  nome: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  senha: {
    type: STRING,
  },
  telefone: {
    type: STRING,
  },
  cpf: {
    type: STRING,
  },
  dataNascimento: {
    type: STRING,
    field: 'data_nascimento',
  },
};

module.exports = { UsuarioSchema };
