const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    phase: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase', required: true },
    week: { type: mongoose.Schema.Types.ObjectId, ref: 'Week', required: true },
    dayNumber: { type: Number, required: true },
    dayTopic: { type: String, required: true },
    textExplanation: { type: String, required: true }
});

const Day = mongoose.model("Day", daySchema);
module.exports = Day;
