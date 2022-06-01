const { Op } = require('sequelize');

exports.mountWhereParams = async (params) => {
  console.log('params');
  console.log(params);
  let where = {};

  if (params.id) {
    where.id = { [Op.eq]: params.id };
  }

  if (params.email) {
    where.email = { [Op.eq]: params.email };
  }

  if (params.cpf) {
    where.cpf = { [Op.eq]: params.cpf };
  }

  if (params.perfilId) {
    where.perfilId = { [Op.eq]: params.perfilId };
  }

  if (params.nome) {
    where.nome = { [Op.like]: params.nome };
  }

  return where;
};

exports.getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
