// Update knexfile.js for MySQL

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "18.157.127.87", // MySQL server host
      user: "lets_grduate_user", // MySQL username
      password: "yCQpW1UikjMApHzk", // MySQL password
      database: "lets_graduate", // MySQL database name
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

// Commands
// 1. Running 'npx knex migrate:latest' will execute the up function in the migration, applying the changes to your database.
// 2. Running 'npx knex migrate:rollback' will execute the down function in the migration, reverting the changes made by the up function.
