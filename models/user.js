const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    items: [{ type: Schema.Types.ObjectId, ref: "items" }],
});

module.exports = mongoose.model("User", UserSchema);