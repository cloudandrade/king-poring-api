const db = require('../config/sequelizeConfig');
const { STRING, INTEGER } = require('sequelize');
const {UsuarioSchema} = require('../Schemas/UsuarioSchema')

const Usuario =  db.sequelize.define('usuario',
UsuarioSchema,
{
	freezeTableName: true,
	timestamps: false,
	modelName: 'UsuarioModel',
	tableName: 'usuario',
}
)


module.exports = Usuario;