const mongoose = require("mongoose");

const progressTrackingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercise: { type: String, required: true },
    progress: { type: Number, required: true }
});

const progress_tracking = mongoose.model("progress_tracking", progressTrackingSchema);
module.exports = progress_tracking;
