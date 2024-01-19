module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "123456",
      database: "letsgraduate",
    },
    migrations: {
      directory: "./db/migrations", // You can choose any directory you like
    },
  },
};
// Commands
// 1. Running 'npx knex migrate:latest' will execute the up function in the migration, applying the changes to your database.
// 2. Running 'npx knex migrate:rollback' will execute the down function in the migration, reverting the changes made by the up function.
