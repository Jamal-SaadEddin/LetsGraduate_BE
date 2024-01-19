exports.up = function (knex) {
  return knex.schema.createTable("students", function (table) {
    table.integer("studentId").primary();
    table.string("firstName");
    table.string("lastName");
    table.string("email");
    table.string("department");
    table.string("address");
    table.string("mobileNumber");
    table.string("gp1State");
    table.string("gp2State");
    table.string("projectType");
    table.boolean("isWithGroup");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
