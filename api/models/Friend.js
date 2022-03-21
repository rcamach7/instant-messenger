const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Friend = new Schema({
  friend: { type: Schema.Types.ObjectId, ref: "User", required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message", required: true }],
});

//Export model
module.exports = mongoose.model("Friend", Friend);
