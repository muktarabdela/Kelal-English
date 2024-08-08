const mongoose = require('mongoose');
const InteractiveExercise = require('./InteractiveExercise');


const listeningComprehensionSchema = new mongoose.Schema({
    storyText: String,
    questions: [{
        question: String,
        expectedAnswer: [String]
    }]
});

const ListeningComprehension = InteractiveExercise.discriminator('Listening Comprehension', listeningComprehensionSchema);

module.exports = ListeningComprehension;
