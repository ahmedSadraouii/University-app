const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date },
  phoneNumber: { type: Number, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true, minlength: 8 },
  password: { type: String, required: true },
});
// Define sub-schema for student
const studentSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

// Define sub-schema for teacher
const teacherSchema = new mongoose.Schema({
  subjects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  ],
  classes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  ],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
});

// Define sub-schema for admin
const adminSchema = new mongoose.Schema({
  role: { type: String, default: "admin" },
});

// Use discriminators to define model inheritance
const User = mongoose.model("User", userSchema);
const Student = User.discriminator("Student", studentSchema);
const Teacher = User.discriminator("Teacher", teacherSchema);
const Admin = User.discriminator("Admin", adminSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, Student, Teacher, Admin };
