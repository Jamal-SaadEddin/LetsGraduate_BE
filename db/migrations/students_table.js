exports.up = function (knex) {
  return knex.schema.createTable("students", function (table) {
    table.integer("studentId").primary();
    table.string("firstName");
    table.string("lastName");
    table.string("email");
    table.string("password");
    table.string("department");
    table.string("address");
    table.string("mobileNumber");
    table.string("projectOneState");
    table.string("projectTwoState");
    table.integer("projectId");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
