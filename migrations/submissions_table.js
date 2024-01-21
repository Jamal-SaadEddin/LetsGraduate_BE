exports.up = function (knex) {
  return knex.schema.createTable("submissions", function (table) {
    table.increments("submissionId").primary();
    table.integer("projectId");
    table.string("type");
    table.string("file");
    table.string("acceptStatus");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("submissions");
};
