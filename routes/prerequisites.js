const express = require("express");
const router = express.Router();
const Prerequisite = require("../models/prerequisite");

router.post("/add", async (req, res) => {
  try {
    const newPrerequisite = await Prerequisite.create(req.body);
    res.json({
      message: "Prerequisite created successfully",
      prerequisite: newPrerequisite,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { department, projectType } = req.query;

    const prerequisites = await Prerequisite.findAll({
      where: {
        department: department,
        projectType: projectType,
      },
    });

    res.json(prerequisites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching prerequisites" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const prerequisiteId = req.query.prerequisiteId;

    await Prerequisite.destroy({
      where: {
        prerequisiteId: prerequisiteId,
      },
    });

    res.json({ message: "Prerequisite deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting prerequisites" });
  }
});

module.exports = router;
