exports.up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.string("verificationCode");
    table.boolean("isVerified").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("verificationCode");
    table.dropColumn("isVerified");
  });
};
