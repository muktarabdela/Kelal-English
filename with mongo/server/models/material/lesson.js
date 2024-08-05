const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    day: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true },
    grammarTopic: {
        explanation: { type: String },
        examples: [{ type: String }]
    },
    vocabularyTopic: {
        explanation: { type: String },
        examples: [{ type: String }]
    },
    interactiveActivities: [{
        type: { type: String, enum: ['Speaking', 'Listening', 'Writing', 'Reading'], required: true },
        description: { type: String, required: true }
    }]
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
