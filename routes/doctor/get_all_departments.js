const express = require("express");
const router = express.Router();
const Student = require("../../models/student");
const Doctor = require("../../models/doctor");
const Department = require("../../models/department");
const Sequelize = require("sequelize");

router.get("/departments", async (req, res) => {
  try {
    // // Find the department name associated with the doctorId
    // const departmentName = await Doctor.findOne({
    //   attributes: ["department"],
    //   where: {
    //     doctorId: doctorId,
    //   },
    // });

    const allDepartments = [];
    // Find department settings associated with department name
    const departmentsNames = await Department.findAll({
      attributes: ["departmentName"],
    });

    for (const index in departmentsNames) {
      const departmentName = departmentsNames[index].dataValues.departmentName;

      // Find department manager
      const manager = await Doctor.findOne({
        attributes: ["firstName", "lastName", "fullName", "doctorId"],
        where: {
          department: departmentName,
          isDepartmentManager: true,
        },
      });

      // Find all doctors associated with this department
      const allDoctors = await Doctor.findAll({
        attributes: ["firstName", "lastName", "fullName", "doctorId"],
        where: {
          department: departmentName,
        },
      });

      let allDoctors2 = [];
      for (const index in allDoctors) {
        let fullName = allDoctors[index].fullName;
        let doctorId = allDoctors[index].doctorId;
        allDoctors2[index] = fullName + " - " + doctorId;
      }

      allDepartments[index] = {
        departmentName: departmentName,
        departmentManager: manager.fullName + " - " + manager.doctorId,
        allDoctors: allDoctors2,
      };
    }

    res.json(allDepartments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching all departments" });
  }
});

module.exports = router;
