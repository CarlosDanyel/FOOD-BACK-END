exports.up = (knex) =>
  knex.schema.createTable("pedido", (table) => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.float("valor");
    table.text("categoria");
    table.text("ImagemPedido");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("pedido");
