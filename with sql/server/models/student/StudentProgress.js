const mongoose = require('mongoose');

const studentProgressSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    currentPhase: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase', required: true },
    currentWeek: { type: mongoose.Schema.Types.ObjectId, ref: 'Week', required: true },
    currentDay: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true },
    coins: { type: mongoose.Schema.Types.ObjectId, ref: 'Coin' },
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],
    progress_tracking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'progress_tracking' }],
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SessionTracking' }],
    lessonsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    interactiveExercisesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InteractiveExercise' }],
    timeSpent: { type: Number, default: 0 } // in seconds
});

const StudentProgress = mongoose.model("StudentProgress", studentProgressSchema);
module.exports = StudentProgress;
