const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  profilePicture: { type: String, required: true },
  friends: [
    {
      friend: { type: Schema.Types.ObjectId, ref: "User", required: true },
      messages: [
        {
          from: { type: Schema.Types.ObjectId, ref: "User", required: true },
          to: { type: Schema.Types.ObjectId, ref: "User", required: true },
          message: { type: String, required: true },
          timestamp: { type: Date },
        },
      ],
      _id: { type: String, required: true },
    },
  ],
  receivedFriendRequests: [
    { user: { type: Schema.Types.ObjectId, ref: "User", required: true } },
  ],
  sentFriendRequests: [
    { user: { type: Schema.Types.ObjectId, ref: "User", required: true } },
  ],
});

//Export model
module.exports = mongoose.model("User", User);
