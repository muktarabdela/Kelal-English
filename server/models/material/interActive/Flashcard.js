const mongoose = require('mongoose');
const InteractiveExercise = require('./InteractiveExercise');

const flashcardsSchema = new mongoose.Schema({
    vocabularies: [{
        word: String,
        definition: String
    }]
});

const Flashcards = InteractiveExercise.discriminator('Flashcards', flashcardsSchema);

module.exports = Flashcards;
