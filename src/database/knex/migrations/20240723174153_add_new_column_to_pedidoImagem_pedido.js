exports.up = function (knex) {
  return knex.schema.table("pedido", function (table) {
    table.text("ImagemPedido").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("pedido", function (table) {
    table.dropColumn("ImagemPedido");
  });
};
