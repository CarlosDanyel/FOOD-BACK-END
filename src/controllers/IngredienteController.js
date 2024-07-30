const knex = require("knex");

class IngredienteController {
  async index(req, res) {
    user_id = req.user.id;

    const pedidos = await knex("ingrediente_pedido")
      .where({ user_id })
      .groupBy("title");

    return res.json(pedidos);
  }
}

module.exports = IngredienteController;
