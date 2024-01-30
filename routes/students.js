const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Sequelize = require("sequelize");
const Partnership = require("../models/partnership");
const Project = require("../models/project");

router.post("/add", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json({
      message: "Student created successfully",
      studdent: newStudent,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/viewProfile", async (req, res) => {
  try {
    const { studentId } = req.query;

    const student = await Student.findOne({
      where: {
        studentId: studentId,
      },
    });

    res.json({
      id: student.studentId,
      firstName: student.firstName,
      lastName: student.lastName,
      fullName: student.fullName,
      department: student.department,
      address: student.address,
      mobileNumber: student.mobileNumber,
      gp1State: student.gp1State,
      gpState: student.gp2State,
      projectType: student.projectType,
      isWithGroup: student.isWithGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error viewing student data" });
  }
});

router.put("/updateProfile", async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const studentUpdateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
    };

    await Student.update(studentUpdateData, {
      where: {
        studentId: studentId,
      },
      fields: ["firstName", "lastName", "address", "mobileNumber"],
    });

    res.json({ message: "Student data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student data" });
  }
});

router.get("/findMyPartners", async (req, res) => {
  try {
    const { studentId } = req.query;

    // Find the projectId associated with the studentId
    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: studentId,
      },
    });

    if (projectId == null) {
      res.json("Doesn't have partnership");
      return; // Exit early if no partnership found
    }

    // check if the group is merged
    const mergedProjectId = await Project.findOne({
      attributes: ["mergedProjectId"],
      where: {
        projectId: projectId.projectId,
      },
    });

    // Fetch student IDs based on the retrieved projectId
    const studentsIds = await Partnership.findAll({
      attributes: ["studentId"],
      where: {
        projectId: projectId.projectId, // Access projectId from result
      },
    });

    const ids1 = studentsIds.map((student) => student.dataValues.studentId);

    let allStudents = {};
    let index = 0;
    for (const id in ids1) {
      const studentId = ids1[id];
      const students = await Student.findOne({
        attributes: [
          "studentId",
          "firstName",
          "lastName",
          "fullName",
          "email",
          "department",
          "address",
          "mobileNumber",
        ],
        where: {
          studentId: studentId,
        },
      });
      allStudents[id] = { ...students.dataValues, fullName: students.fullName };
      index = id;
    }

    if (mergedProjectId.mergedProjectId) {
      let twoMergedGroups = {};
      // get projectId for other merged group
      const projectId2 = await Project.findOne({
        attributes: ["projectId"],
        where: {
          mergedProjectId: mergedProjectId.mergedProjectId,
          projectId: { [Sequelize.Op.ne]: projectId.projectId },
        },
      });

      // Fetch student IDs based on the retrieved projectId
      const studentsIds2 = await Partnership.findAll({
        attributes: ["studentId"],
        where: {
          projectId: projectId2.projectId, // Access projectId from result
        },
      });

      const ids2 = studentsIds2.map((student) => student.dataValues.studentId);

      for (const id in ids2) {
        const studentId2 = ids2[id];
        const students2 = await Student.findOne({
          attributes: [
            "studentId",
            "firstName",
            "lastName",
            "fullName",
            "email",
            "department",
            "address",
            "mobileNumber",
          ],
          where: {
            studentId: studentId2,
          },
        });
        index++;
        allStudents[index] = {
          ...students2.dataValues,
          fullName: students2.fullName,
        };
      }

      res.json(Object.values(allStudents));
    } else {
      res.json(allStudents);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching partners" });
  }
});

module.exports = router;
