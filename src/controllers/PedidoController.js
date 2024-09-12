const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class PedidoController {
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
        .leftJoin("ingrediente_pedido", "pedido.id", "ingrediente_pedido.pedido_id") 
        .where("pedido.title", "like", `%${title}%`) 
        .orWhere("ingrediente_pedido.title", "like", `%${title}%`)  
        .groupBy("pedido.id")  
        .select("pedido.*"); 
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
