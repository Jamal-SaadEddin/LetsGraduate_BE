const express = require("express");
const router = express.Router();
const Partnership = require("../models/partnership");

router.post("/create", async (req, res) => {
  try {
    const newPartnership = await Partnership.create(req.body);
    res.json({
      message: "Partnership created successfully",
      Partnership: newPartnership,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/fetchGroupId", async (req, res) => {
  try {
    const { studentId } = req.query;

    const projectId = await Partnership.findOne({
      attributes: ["projectId"],
      where: {
        studentId: studentId,
      },
    });

    if (projectId == null) {
      res.json("Doesn't have partnership");
    } else {
      res.json(projectId);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching partnership" });
  }
});

router.get("/fetchStudentsIds", async (req, res) => {
  try {
    const { projectId } = req.query;

    const studentsIds = await Partnership.findAll({
      attributes: ["studentId"],
      where: {
        projectId: projectId,
      },
    });

    res.json(studentsIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching partnership" });
  }
});

module.exports = router;
