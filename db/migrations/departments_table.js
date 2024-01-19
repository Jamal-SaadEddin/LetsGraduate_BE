exports.up = function (knex) {
  return knex.schema.createTable("departments", function (table) {
    table.string("departmentName").primary();
    table.integer("maxNoOfStuPerProj");
    table.integer("maxNoOfProjPerDoct");
    table.integer("maxNoOfStuPerDoct");
    table.string("currentPeriod");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("departments");
};
