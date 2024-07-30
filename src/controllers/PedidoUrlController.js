const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class PedidoUrlController {
  async update(request, response) {
    const user_id = request.user.id;
    const pedidoFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    // Verifica se o usuário existe
    const user = await knex("users").where({ id: user_id }).first();
    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar",
        401
      );
    }

    // Verifica se o pedido existe
    const pedido = await knex("pedido").where({ user_id }).first();
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
    await knex("pedido").update({ ImagemPedido: filename }).where({ user_id });

    return response.json(pedido);
  }
}

module.exports = PedidoUrlController;
