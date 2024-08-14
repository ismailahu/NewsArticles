const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    Name: {
        type: String,
        unique: true,
        required: true
    },
    Count: {
        type: Number,
        required: true,
        default: 0
    }

}, {timestamps : true})

module.exports = mongoose.model("Category", categorySchema)