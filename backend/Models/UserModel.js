const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      unique: true,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
    },
    Category: {
      type: String, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
