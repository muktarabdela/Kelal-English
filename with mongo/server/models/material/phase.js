const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    name: { type: String, required: true },
    currentPhase: { type: Number, required: true },
    description: { type: String },
    TotalPhases: { type: Number, required: true },
    durationInWeeks: { type: Number, required: true }
});

const Phase = mongoose.model("Phase", phaseSchema);
module.exports = Phase;
