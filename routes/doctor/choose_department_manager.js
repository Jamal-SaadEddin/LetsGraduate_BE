const express = require("express");
const router = express.Router();
const Doctor = require("../../models/doctor");

router.put("/departmentManager", async (req, res) => {
  try {
    const department = req.body.department;
    const newManager = req.body.newManager;
    const data = newManager.split(" - ");
    const id = data[data.length - 1];
    const newManagerId = parseInt(id);

    // delete old manager
    await Doctor.update(
      { isDepartmentManager: false },
      {
        where: {
          department: department,
          isDepartmentManager: true,
        },
        fields: ["isDepartmentManager"],
      }
    );

    // add new manager
    await Doctor.update(
      { isDepartmentManager: true },
      {
        where: {
          department: department,
          doctorId: newManagerId,
        },
        fields: ["isDepartmentManager"],
      }
    );

    res.json({ message: "New manager updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating new manager" });
  }
});

module.exports = router;
