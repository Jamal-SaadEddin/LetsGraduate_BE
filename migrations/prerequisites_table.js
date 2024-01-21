exports.up = function (knex) {
  return knex.schema.createTable("prerequisites", function (table) {
    table.increments("prerequisiteId").primary();
    table.string("department");
    table.string("projectType");
    table.string("content");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("prerequisites");
};
