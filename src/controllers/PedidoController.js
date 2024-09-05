const knex = require("../database/knex");

class PedidoController {
  async create(req, res) {
    const { title, description, valor, categoria, ingredients } = req.body;
    const user_id = req.user.id;

    const [pedido_id] = await knex("pedido").insert({
      title,
      description,
      valor,
      categoria,
      user_id,
    });

    const ingredientsInsert = ingredients.map((title) => {
      return {
        pedido_id,
        title,
      };
    });

    await knex("ingrediente_pedido").insert(ingredientsInsert);

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const pedido = await knex("pedido").where({ id }).first();
    const ingredientes = await knex("ingrediente_pedido")
      .where({ pedido_id: id })
      .orderBy("title");

    return res.json({
      ...pedido,
      ingredientes,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("ingrediente_pedido").where({ pedido_id: id }).delete();

    await knex("pedido").where({ id }).delete();
    return res.json();
  }

  async update(req, res) {
    const { title, description, valor, categoria, ingredients } = req.body;

    const { id } = req.params;

    await knex("pedido").where({ id }).update({
      title,
      description,
      valor,
      categoria,
    });

    // await knex("ingrediente_pedido").where({ pedido_id: id }).delete();

    const ingredientsInsert = ingredients.map((title) => ({
      pedido_id: id,
      title,
    }));

    await knex("ingrediente_pedido").insert(ingredientsInsert);

    return res.json({ message: "Pedido atualizado com sucesso" });
  }

async index(req, res) {
  const { title } = req.query;

  let pedidos;

  if (title) {
    pedidos = await knex("pedido")
      .where("title", "like", `%${title}%`)
      .select("*");
  } else {
    pedidos = await knex("pedido").select("*");
  }

  const ingredientes = await knex("ingrediente_pedido").select("*");

  const pedidosWithIngredientes = pedidos.map((pedido) => {
    const pedidoIngredientes = ingredientes.filter(
      (ingrediente) => ingrediente.pedido_id === pedido.id
    );

    return {
      ...pedido,
      ingredientes: pedidoIngredientes,
    };
  });

  return res.json(pedidosWithIngredientes);
}



}

module.exports = PedidoController;
