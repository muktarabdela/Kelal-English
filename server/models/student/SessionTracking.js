const mongoose = require("mongoose");
const sessionTrackingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    session_start: { type: Date, default: Date.now },
    session_end: { type: Date, default: Date.now },
    duration: { type: Number, required: true } // in seconds
});

const SessionTracking = mongoose.model("SessionTracking", sessionTrackingSchema);
module.exports = SessionTracking;
