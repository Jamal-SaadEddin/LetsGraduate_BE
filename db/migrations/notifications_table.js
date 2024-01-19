exports.up = function (knex) {
  return knex.schema.createTable("notifications", function (table) {
    table.increments("notificationId").primary();
    table.integer("senderId");
    table.integer("reciverId");
    table.string("readStatus");
    table.string("type");
    table.string("acceptStatus");
    table.string("content");
    table.string("dateCreated");
    table.string("notifyButtonText");
    table.string("senderType");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notifications");
};
