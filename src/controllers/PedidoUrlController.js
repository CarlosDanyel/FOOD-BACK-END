const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class PedidoUrlController {
    async create(request, response) {
    const user_id = request.user.id;

    const { title, description, valor, categoria } = request.body;
    const ingredients = JSON.parse(request.body.ingredients);
    const pedidoFileName = request.file.filename; 

    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(pedidoFileName);

    const [pedido_id] = await knex("pedido").insert({
      ImagemPedido: filename,
      user_id,
      title,
      description,
      valor,
      categoria,
    }).returning("id"); 

    const ingredientsInsert = ingredients.map((title) => {
      return {
        pedido_id: pedido_id.id,
        title
      };
    });

    await knex("ingrediente_pedido").insert(ingredientsInsert);

    return response.json({
      message: "Pedido criado com sucesso e imagem associada.",
    });
  }

  async update(request, response) {
    const { id } = request.params; 
    const pedidoFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const pedido = await knex("pedido").where({ id }).first();
    if (!pedido) {
      throw new AppError("Pedido não encontrado", 404);
    }

    if (pedido.ImagemPedido) {
      await diskStorage.deleteFile(pedido.ImagemPedido);
    }

    const filename = await diskStorage.saveFile(pedidoFileName);
    pedido.ImagemPedido = filename;

   
    await knex("pedido").update({ ImagemPedido: filename }).where({ id });

    return response.json(pedido);
  }
}

module.exports = PedidoUrlController;


module.exports = PedidoUrlController;
