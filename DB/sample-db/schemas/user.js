const { Schema } = require("mongoose");

const User = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = User;