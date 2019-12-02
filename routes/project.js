const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET /api/projects
router.get("/", (req, res, next) => {
  // return all projects
});

// GET /api/projects/:id
router.get("/:id", (req, res, next) => {
  // return 1 project w/ a given id
});

// POST /api/projects
router.post("/", (req, res) => {
  // create 1 project

  console.log(req.body);

  Project.create({
    title: req.body.title,
    description: req.body.description
  })
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
