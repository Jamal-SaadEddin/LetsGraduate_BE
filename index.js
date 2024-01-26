const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const prerequisitesRoutes = require("./routes/prerequisites");
const partnershipsRoutes = require("./routes/partnerships");
const studentsRoutes = require("./routes/students");
const doctorsRoutes = require("./routes/doctors");
const projectsRoutes = require("./routes/projects");
const findPartnersRoutes1 = require("./routes/student/findpartner/findgroups");
const findPartnersRoutes2 = require("./routes/student/findpartner/find_students_without_groups");
const chooseSupervisorRoutes = require("./routes/student/findsupervisors");
const fetchAbstractRoutes = require("./routes/student/findabstract");
const abstractCommentstRoutes = require("./routes/student/abstract_comments");
const createNotificationRoutes = require("./routes/student/notification/create_notification");
const viewNotificationsRoutes = require("./routes/student/notification/view_notifications");
const deleteNotificationsRoutes = require("./routes/student/notification/delete_notification");
const viewJoinOrCancelRoutes = require("./routes/student/view_join_or_cancel");
const usersRoutes = require("./routes/users");
const registerProjectRoutes = require("./routes/student/register_project");
const deleteAccountRoutes = require("./routes/delete_account");
const findMyGroupsRoutes = require("./routes/doctor/find_mygroups");
const abstractSubmissionsRoutes = require("./routes/doctor/abstract_submissions");
const addCommentRoutes = require("./routes/doctor/add_comment");
const evaluatingsDetailsRoutes = require("./routes/doctor/evaluatings_details");

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
app.use("/doctors", doctorsRoutes);
app.use("/projects", projectsRoutes);
app.use("/findPartners1", findPartnersRoutes1);
app.use("/findPartners2", findPartnersRoutes2);
app.use("/chooseSupervisor", chooseSupervisorRoutes);
app.use("/submission", fetchAbstractRoutes);
app.use("/abstractComments", abstractCommentstRoutes);
app.use("/createNotification", createNotificationRoutes);
app.use("/viewNotifications", viewNotificationsRoutes);
app.use("/deleteNotifications", deleteNotificationsRoutes);
app.use("/viewJoinOrCancel", viewJoinOrCancelRoutes);
app.use("/users", usersRoutes);
app.use("/registerProject", registerProjectRoutes);
app.use("/deleteAccount", deleteAccountRoutes);
app.use("/findMyGroups", findMyGroupsRoutes);
app.use("/abstractSubmissions", abstractSubmissionsRoutes);
app.use("/createComment", addCommentRoutes);
app.use("/evaluatingsDetails", evaluatingsDetailsRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
