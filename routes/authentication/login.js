const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Student = require("../../models/student");
const Partnership = require("../../models/partnership");
const Doctor = require("../../models/doctor");
const Department = require("../../models/department");

router.get("/login", async (req, res) => {
  try {
    const { userId } = req.query;
    const { password } = req.query;

    // Find the projectId associated with the studentId
    const user = await User.findOne({
      where: {
        userId: userId,
      },
    });

    // validate the old password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ user: null });
    }

    let userData = {};
    // find user type
    if (user.type == "student") {
      // find projectId
      const projectId = await Partnership.findOne({
        attributes: ["projectId"],
        where: {
          studentId: userId,
        },
      });

      const studentData = await Student.findOne({
        where: {
          studentId: userId,
        },
      });

      // get current period
      const department = await Department.findOne({
        attributes: ["currentPeriod"],
        where: {
          departmentName: studentData.department,
        },
      });

      userData = {
        id: userId,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        department: studentData.department,
        address: studentData.address,
        mobileNumber: studentData.mobileNumber,
        type: "student",
        currentPeriod: department.currentPeriod,
        info: {
          projectId: projectId.projectId,
          projectOneState: studentData.gp1State,
          projectTwoState: studentData.gp2State,
        },
      };
    } else {
      const doctorData = await Doctor.findOne({
        where: {
          doctorId: userId,
        },
      });

      // get current period
      const department = await Department.findOne({
        attributes: ["currentPeriod"],
        where: {
          departmentName: doctorData.department,
        },
      });

      userData = {
        id: userId,
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        email: doctorData.email,
        department: doctorData.department,
        address: doctorData.address,
        mobileNumber: doctorData.mobileNumber,
        type: "doctor",
        currentPeriod: department.currentPeriod,
        info: {
          isSupervisor: doctorData.isSupervisor,
          isDepartmentManager: doctorData.isDepartmentManager,
          isProjectsCommitteeMember: doctorData.isProjectsCommitteeMember,
        },
      };
    }

    // find user details

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

module.exports = router;
