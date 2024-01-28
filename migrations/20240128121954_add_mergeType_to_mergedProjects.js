exports.up = function (knex) {
  return knex.schema.table("mergedProjects", function (table) {
    table.string("mergeType");
  });
};

exports.down = function (knex) {
  return knex.schema.table("mergedProjects", function (table) {
    table.dropColumn("mergeType");
  });
};
