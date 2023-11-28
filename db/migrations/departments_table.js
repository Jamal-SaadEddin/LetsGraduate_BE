exports.up = function (knex) {
  return knex.schema.createTable("departments", function (table) {
    table.string("department").primary();
    table.integer("maxNoOfStuForProj");
    table.integer("maxNoOfProjForDoct");
    table.integer("maxNoOfStuForDoct");
    table.string("currentPeriod");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("departments");
};
