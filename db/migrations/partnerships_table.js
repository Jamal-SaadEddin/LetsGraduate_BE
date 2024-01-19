exports.up = function (knex) {
  return knex.schema.createTable("partnerships", function (table) {
    table.integer("studentId").primary();
    table.integer("projectId");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("partnerships");
};
