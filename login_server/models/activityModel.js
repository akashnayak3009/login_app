import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "LoginProfiles" },
  loginTimestamp: { type: Date, default: Date.now },
  logoutTimestamp: { type: Date },
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
