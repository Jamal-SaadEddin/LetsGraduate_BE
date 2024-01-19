exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.integer("userId").primary();
    table.string("password");
    table.string("type");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
