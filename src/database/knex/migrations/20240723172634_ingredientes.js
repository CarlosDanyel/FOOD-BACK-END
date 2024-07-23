exports.up = (knex) =>
  knex.schema.createTable("ingrediete", (table) => {
    table.increments("id");
    table.text("title");
    table
      .integer("pedido_id")
      .references("id")
      .inTable("pedido")
      .onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("ingrediete");
