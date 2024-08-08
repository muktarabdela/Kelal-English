const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', },
    name: { type: String, required: true },
    description: { type: String },
    phaseNumber: { type: Number, required: true },
    TotalPhases: { type: Number, required: true },
    durationInWeeks: { type: Number, required: true }
});

const Phase = mongoose.model("Phase", phaseSchema);
module.exports = Phase;
