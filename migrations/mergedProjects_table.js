exports.up = function (knex) {
  return knex.schema.createTable("mergedProjects", function (table) {
    table.increments("mergedProjectId").primary();
    table.string("projectTitle");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("mergedProjects");
};
