exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("commentId").primary();
    table.integer("doctorId");
    table.integer("projectId");
    table.string("content");
    table.string("dateCreated");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
