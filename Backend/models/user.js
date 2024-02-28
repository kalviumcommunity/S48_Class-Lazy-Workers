const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  github: String,
  squad: Number, // Squad number of the user's squad
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
