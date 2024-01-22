const express = require("express");
const router = express.Router();
const Doctor = require("../../models/doctor");
const Student = require("../../models/student");

router.get("/supervisors", async (req, res) => {
  try {
    const { studentId } = req.query;

    // Find the department associated with the studentId
    const department = await Student.findOne({
      attributes: ["department"],
      where: {
        studentId: studentId,
      },
    });

    // Retrieve supervisors information based on department & isSupervisor
    const supervisors = await Doctor.findAll({
      attributes: ["firstName", "lastName", "fullName", "department", "email"],
      where: {
        department: department.department,
        isSupervisor: 1,
      },
    });

    res.json(supervisors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching supervisors" });
  }
});

module.exports = router;
