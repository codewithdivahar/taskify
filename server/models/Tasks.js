const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  taskId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deviceType: {
    type: String,
    required: true,
  },
  data: [locationSchema],
});

module.exports = mongoose.model("Tasks", TaskSchema);
