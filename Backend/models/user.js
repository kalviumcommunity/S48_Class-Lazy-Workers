const mongoose = require("mongoose");
const Joi = require("joi");

// Define MongoDB schema
const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  github: String,
  squad: Number,
});

// Define Joi validation schema
const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(30).required(),
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  github: Joi.string().uri(),
  squad: Joi.number().integer().min(1).max(100).required(),
});

// Export both schemas
module.exports = {
  UserModel: mongoose.model("User", UserSchema), // Use "User" as the model name
  userValidationSchema,
};
