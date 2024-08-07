// create controller for user registration

const Achievement = require("../models/student/Achievement");
const Batch = require("../models/student/Batch");
const SuperAdmin = require("../models/superAdmin");
const User = require("../models/student/studentModel");
const Phase = require("../models/material/phase");
const Day = require("../models/material/day");
const Week = require("../models/material/week");
const Lesson = require("../models/material/lesson");
const InteractiveExercise = require("../models/material/interActive/InteractiveExercise");
const Shadowing = require('../models/material/interActive/shadowing');
const InteractiveQuizzes = require('../models/material/interActive/quizzes');
const ListeningComprehension = require('../models/material/interActive/listening');
const Flashcards = require('../models/material/interActive/Flashcard');

const register = async (req, res) => {
    try {
        // check if user already exists
        const alreadyRegistered = await SuperAdmin.findOne({ email: req.body.email });
        if (alreadyRegistered) {
            return res.status(400).json({ message: "email already exists" });
        }
        // check if phone number already exists
        const phone = await SuperAdmin.findOne({ phone: req.body.phone });
        if (phone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }
        const user = await SuperAdmin.create(req.body);
        const token = user.createJWT();
        res.status(201).json({ user: { full_name: user.full_name, email: user.email }, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// create controller for user login
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password, " });
    }
    const user = await SuperAdmin.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "user not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.createJWT();
    res.status(200).json({ user: { full_name: user.full_name, email: user.email }, token });
}

// create controller for adding Batch
const addBatch = async (req, res) => {
    try {
        const batch = await Batch.create(req.body);
        res.status(201).json({ batch });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
// create controller for adding achievements
const addAchievements = async (req, res) => {
    try {
        const achievement = await Achievement.create(req.body);
        res.status(201).json({ achievement });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
// create controller for post student daily lessons

const postStudentDailyLessons = async (req, res) => {
    try {
        // get day week and phase
        const { dayId, weekId, phaseId } = req.body;
        if (!dayId || !weekId || !phaseId) {
            return res.status(400).json({ message: "Please provide dayId, weekId and phaseId" });
        }

        const { mainTopic, grammarTopic, vocabularyTopic } = req.body;
        // Create a new lesson
        const newLesson = new Lesson({
            day: dayId,
            week: weekId,
            phase: phaseId,
            mainTopic,
            grammarTopic,
            vocabularyTopic,
        });

        // Save the lesson to the database
        await newLesson.save();

        res.status(201).json({ message: "Lesson added successfully", lesson: newLesson });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// create controller for post interactive exercise


const postInteractiveExercise = async (req, res) => {
    try {
        const lessonId = req.params.id;
        if (!lessonId) {
            return res.status(400).json({ message: "Please provide LessonId" });
        }

        const { type, name, description, contents, quizData, storyText, questions, vocabularies } = req.body;
        let newExercise;

        // Check the type and create the respective exercise document
        switch (type) {
            case 'Shadowing':
                newExercise = new Shadowing({
                    lesson: lessonId,
                    type,
                    name,
                    description,
                    contents
                });
                break;
            case 'Interactive Quizzes':
                newExercise = new InteractiveQuizzes({
                    lesson: lessonId,
                    type,
                    name,
                    description,
                    quizData
                });
                break;
            case 'Listening Comprehension':
                newExercise = new ListeningComprehension({
                    lesson: lessonId,
                    type,
                    name,
                    description,
                    storyText,
                    questions
                });
                break;
            case 'Flashcards':
                newExercise = new Flashcards({
                    lesson: lessonId,
                    type,
                    name,
                    description,
                    vocabularies
                });
                break;
            default:
                return res.status(400).json({ message: "Invalid type provided" });
        }

        // Save the interactive exercise to the database
        await newExercise.save();

        res.status(201).json({ message: "Interactive exercise added successfully", exercise: newExercise });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// create controller for updating student subscription
const updateSubscription = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { status, subscription_date } = req.body;

        // Update the subscription fields within the user document
        user.subscription.status = status || user.subscription.status;
        user.subscription.subscription_date = subscription_date || user.subscription.subscription_date;
        user.updated_at = Date.now();

        await user.save();

        res.status(200).json({ message: "Subscription updated successfully", subscription: user.subscription });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// add batch for user
const addBatchForUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const batchId = req.body.batchId;

        // Log the received IDs for debugging
        console.log(`User ID: ${userId}`);
        console.log(`Batch ID: ${batchId}`);

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the batch by ID
        const batch = await Batch.findById(batchId);
        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        // Check if the batch ID is already associated with the user
        if (user.batches.includes(batchId)) {
            return res.status(400).json({ message: "Batch is already associated with this user" });
        }

        // Add the batch ID to the user's batches array
        user.batches.push(batchId);

        // Save the updated user
        const updatedUser = await user.save();

        res.status(200).json({ message: "Batch added to user successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// add controller for adding phase
const addPhase = async (req, res) => {
    try {
        const phase = await Phase.create(req.body);
        res.status(201).json({ message: "phase add ", phase });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// add controller for adding weeks
const addWeeks = async (req, res) => {
    try {
        const week = await Week.create(req.body);
        res.status(201).json({ message: "week add ", week });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
// add controller for adding days
const addDays = async (req, res) => {
    try {
        const day = await Day.create(req.body);
        res.status(201).json({ message: "day add ", day });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { register, login, addBatch, addAchievements, updateSubscription, addBatchForUser, addPhase, addWeeks, addDays, postStudentDailyLessons, postInteractiveExercise };

