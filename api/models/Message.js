const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date },
});

//Export model
module.exports = mongoose.model("Message", Message);
