const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  sector: { type: String, required: true },
  group: { type: String, required: true },
});

module.exports = mongoose.model("Class", classSchema);
