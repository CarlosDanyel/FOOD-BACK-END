exports.up = function (knex) {
  return knex.schema.dropTableIfExists("ingrediente").then(function () {
    return knex.schema.createTable("ingrediente_pedido", function (table) {
      table.increments("id").primary();
      table.text("title");
      table
        .integer("pedido_id")
        .references("id")
        .inTable("pedido")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("ingrediente").then(function () {
    return knex.schema.createTable("ingrediente_pedido", function (table) {
      table.increments("id").primary();
      table.text("title");
      table
        .integer("pedido_id")
        .references("id")
        .inTable("pedido")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  });
};
