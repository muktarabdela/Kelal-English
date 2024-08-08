const mongoose = require('mongoose');

const interactiveExerciseSchema = new mongoose.Schema({
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    type: { type: String, enum: ['Shadowing', 'Interactive Quizzes', 'Listening Comprehension', 'Flashcards'], required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
}, { discriminatorKey: 'type' });

const InteractiveExercise = mongoose.model('InteractiveExercise', interactiveExerciseSchema);

module.exports = InteractiveExercise;
