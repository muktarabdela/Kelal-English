const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
    phase: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase', required: true },
    week: { type: mongoose.Schema.Types.ObjectId, ref: 'Week', required: true },
    day: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true },
    mainTopic: { type: String, required: true },
    grammarTopic: {
        explanation: { type: String },
        examples: [{ type: String }]
    },
    vocabularyTopic: {
        explanation: { type: String },
        examples: [{ type: String }]
    },
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
