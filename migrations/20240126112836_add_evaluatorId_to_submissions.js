exports.up = function (knex) {
  return knex.schema.table("submissions", function (table) {
    table.integer("evaluatorId").unsigned();
  });
};

exports.down = function (knex) {
  return knex.schema.table("submissions", function (table) {
    table.dropColumn("evaluatorId");
  });
};
