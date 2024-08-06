const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
    phase: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase', required: true },
    weekNumber: { type: Number, required: true },
    weekTopic: { type: String, required: true },
    overview: { type: String, required: true },
    objectives: { type: String, required: true }
});

const Week = mongoose.model("Week", weekSchema);
module.exports = Week;
