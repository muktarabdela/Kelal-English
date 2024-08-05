const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    week: { type: mongoose.Schema.Types.ObjectId, ref: 'Week', required: true },
    currentDay: { type: Number, required: true },
    title: { type: String, required: true },
    textExplanation: { type: String, required: true }
});

const Day = mongoose.model("Day", daySchema);
module.exports = Day;
