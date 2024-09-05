const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class PedidoUrlController {
  async update(request, response) {
    const { id } = request.params; // Pega o ID do pedido da URL
    const pedidoFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    // Verifica se o pedido existe
    const pedido = await knex("pedido").where({ id }).first();
    if (!pedido) {
      throw new AppError("Pedido não encontrado", 404);
    }

    // Se o pedido tem uma imagem existente, apaga a imagem antiga
    if (pedido.ImagemPedido) {
      await diskStorage.deleteFile(pedido.ImagemPedido);
    }

    // Salva a nova imagem
    const filename = await diskStorage.saveFile(pedidoFileName);
    pedido.ImagemPedido = filename;

    // Atualiza o pedido com a nova imagem
    await knex("pedido").update({ ImagemPedido: filename }).where({ id });

    return response.json(pedido);
  }
}

module.exports = PedidoUrlController;


module.exports = PedidoUrlController;
