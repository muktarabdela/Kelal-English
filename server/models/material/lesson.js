const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
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
