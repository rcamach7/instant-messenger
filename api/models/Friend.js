const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Friend = new Schema({
  friend: { type: Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      from: { type: Schema.Types.ObjectId, ref: "User", required: true },
      to: { type: Schema.Types.ObjectId, ref: "User", required: true },
      message: { type: String, required: true },
      timestamp: { type: Date },
    },
  ],
});

//Export model
module.exports = mongoose.model("Friend", Friend);
