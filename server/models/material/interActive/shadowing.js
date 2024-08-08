const mongoose = require('mongoose');
const InteractiveExercise = require('./InteractiveExercise');


const shadowingSchema = new mongoose.Schema({
    contents: {
        words: [String],
        vocabulary: [String],
        verbs: [String],
        sentences: [String],
    }
});

const Shadowing = InteractiveExercise.discriminator('Shadowing', shadowingSchema);

module.exports = Shadowing;
