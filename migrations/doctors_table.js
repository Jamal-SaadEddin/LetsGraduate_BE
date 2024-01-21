exports.up = function (knex) {
  return knex.schema.createTable("doctors", function (table) {
    table.integer("doctorId").primary();
    table.string("firstName");
    table.string("lastName");
    table.string("email");
    table.string("department");
    table.string("address");
    table.string("mobileNumber");
    table.boolean("isSupervisor");
    table.boolean("isDepartmentManager");
    table.boolean("isProjectsCommitteeMember");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("doctors");
};
