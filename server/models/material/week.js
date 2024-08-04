const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    phase: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase', required: true },
    currentWeek: { type: Number, required: true },
    overview: { type: String, required: true },
    objectives: { type: String, required: true }
});

const Week = mongoose.model("Week", weekSchema);
module.exports = Week;
