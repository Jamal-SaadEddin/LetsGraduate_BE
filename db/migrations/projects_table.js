exports.up = function (knex) {
  return knex.schema.createTable("projects", function (table) {
    table.increments("projectId").primary();
    table.string("projectTitle");
    table.integer("doctorId");
    table.integer("mergedProjectId");
    table.string("projectType");
    table.string("department");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
