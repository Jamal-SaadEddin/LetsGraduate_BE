const express = require("express");
const sequelize = require("./config/database");
const Prerequisite = require("./models/prerequisite");
const Partnership = require("./models/partnership");
const prerequisitesRoutes = require("./routes/prerequisites");
const partnershipsRoutes = require("./routes/partnerships");

const app = express();

// Database connection
sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Middlewares
app.use(express.json());

// Routes
app.use("/prerequisites", prerequisitesRoutes);
app.use("/partnerships", partnershipsRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
