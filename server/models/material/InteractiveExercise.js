const mongoose = require('mongoose');

const interactiveExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Shadowing', 'Interactive Quizzes', 'Listening Comprehension', 'Flashcards'], required: true }
});

const InteractiveExercise = mongoose.model("InteractiveExercise", interactiveExerciseSchema);
module.exports = InteractiveExercise;
