const { STRING, INTEGER, DATEONLY } = require('sequelize');

const UsuarioSchema = {
        perfil_id: {
            type: INTEGER,
            required: true,
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
        data_nascimento: {
            type: STRING,
          
        }
    
};

module.exports = {UsuarioSchema};