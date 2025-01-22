import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    description: {
      type: String,
    }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;