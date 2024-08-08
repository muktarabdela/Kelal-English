const mongoose = require('mongoose');
const InteractiveExercise = require('./InteractiveExercise');

const interactiveQuizzesSchema = new mongoose.Schema({
    quizData: [{
        question: String,
        options: [String],
        answer: String
    }]
});

const InteractiveQuizzes = InteractiveExercise.discriminator('Interactive Quizzes', interactiveQuizzesSchema);

module.exports = InteractiveQuizzes;
