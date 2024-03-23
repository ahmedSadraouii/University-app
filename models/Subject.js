const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coefficient: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["TD", "TP", "CR"],
    validate: {
      validator: function (value) {
        return ["TD", "TP", "CR"].includes(value);
      },
      message: (props) =>
        `${props.value} is not a valid type. Valid types are 'TD', 'TP', or 'CR'.`,
    },
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
