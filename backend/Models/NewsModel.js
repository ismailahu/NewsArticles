const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      unique: true,
      required: true,
    },
    Detail: {
      type: String,
      required: true,
    },
    UserName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
