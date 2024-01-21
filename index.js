const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const Prerequisite = require("./models/prerequisite");
const Partnership = require("./models/partnership");
const Student = require("./models/student");
const prerequisitesRoutes = require("./routes/prerequisites");
const partnershipsRoutes = require("./routes/partnerships");
const studentsRoutes = require("./routes/students");

const app = express();
app.use(cors());

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
app.use("/students", studentsRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
