const express = require("express");
const router = express.Router();
const Student = require("../../models/student");

router.put("/project", async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const projectType = req.body.projectType;

    if (projectType === "gp1") {
      await Student.update(
        { projectType: projectType, gp1State: "in progress" },
        {
          where: {
            studentId: studentId,
          },
          fields: ["projectType", "gp1State"],
        }
      );
    } else if (projectType === "gp2") {
      await Student.update(
        { projectType: projectType, gp2State: "in progress" },
        {
          where: {
            studentId: studentId,
          },
          fields: ["projectType", "gp2State"],
        }
      );
    }

    res.json({ message: "Student project data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student data" });
  }
});

module.exports = router;
