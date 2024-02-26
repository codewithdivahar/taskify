const express = require("express");
const Tasks = require("../models/Tasks");
const User = require("../models/User");
const router = express.Router();

const getNewTasks = (user) => {
  const taskObjArr = [];
  const taskToGenerate = 4;
  const locations = ["UNITED STATES", "CANADA", "PARIS", "LONDON"];
  for (let i = 0; i < taskToGenerate; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    taskObjArr.push({
      location,
      taskId: "CODE",

      name:
        "TSK_" +
        location.substring(0, 2) +
        "_" +
        Math.floor(Math.random() * 100000) +
        9,
      status: "PENDING",
      displayName: user?.displayName,
    });
  }
  return taskObjArr;
};

// @desc Tasks
// @route GET /
router.get("/tasks", async (req, res) => {
  const { googleId } = req?.user;
  if (req.isAuthenticated()) {
    let user = await User.findOne({ googleId });
    let tasks = await Tasks.findOne({ user: user._id });
    if (!tasks) {
      let newTasks = {};
      newTasks["user"] = user._id;
      newTasks["data"] = getNewTasks(user);
      newTasks["deviceType"] = "mobile";
      tasksFromDb = await Tasks.create(newTasks);
      tasks = newTasks;
    }
    res.status(200).send({ tasks });
  } else {
    res.status(401).send({ message: "User un authorized" });
  }
});

router.get("/allTasks", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      let tasks = await Tasks.find({ deviceType: "mobile" })
        .populate("user")
        .lean();
      if (tasks) {
        res.status(200).send({ error: false, tasks });
      } else {
        res.status(404).send({ error: true });
      }
    } catch (err) {
      console.log("Error --> All Task --->", err);
    }
  } else {
    res.status(401).send({ error: true, message: "User is not Authorized" });
  }
});

router.post("/tasks", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = await User.findOne({ googleId: req?.user?.googleId });
    let task = await Tasks.findOne({ user: user._id });
    if (req?.body && task) {
      const task = await Tasks.updateOne(req?.body?.task);
      res.status(200).send({ success: true, error: false });
    } else {
      res.status(404).send({ success: false, error: true });
    }
  } else {
    res.status(401).send({ message: "User un authorized" });
  }
});
module.exports = router;
