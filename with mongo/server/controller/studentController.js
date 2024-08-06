// create controller for user registration

const Week = require("../models/material/week");
const User = require("../models/student/studentModel");
const StudentProgress = require("../models/student/StudentProgress");
const Day = require("../models/material/day");
const Phase = require("../models/material/phase");
const Coin = require("../models/student/Coin");
const register = async (req, res) => {
    try {
        // Check if user already exists
        const alreadyRegistered = await User.findOne({ email: req.body.email });
        if (alreadyRegistered) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check if phone number already exists 
        const phoneExists = await User.findOne({ phone: req.body.phone });
        if (phoneExists) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        // Create the user
        const user = await User.create(req.body);

        // Create/find the initial coin
        const coin = await Coin.create({
            student: user._id,
            currentCoin: 0
        });

        // Find the initial phase, week, and day
        const initialPhase = await Phase.findOne({ name: "basic" }); // Replace with your criteria
        console.log("initialPhase", initialPhase);
        const initialWeek = await Week.findOne({ phase: initialPhase._id, weekNumber: 1 });
        console.log("initialWeek", initialWeek);
        const initialDay = await Day.findOne({ phase: initialPhase._id, week: initialWeek._id, dayNumber: 1 });
        console.log("initialDay", initialDay);

        // Create the initial progress for the user
        await StudentProgress.create({
            student: user._id,
            currentPhase: initialPhase._id,
            currentWeek: initialWeek._id,
            currentDay: initialDay._id,
            coins: coin._id,
            achievements: [],
            progress_tracking: [],
            sessions: [],
            lessonsCompleted: [],
            interactiveExercisesCompleted: [],
            timeSpent: 0
        });

        const token = user.createJWT();
        res.status(201).json({ user: { full_name: user.full_name, email: user.email }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// create controller for user login
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password, " });
    }
    const user = await User.findOne({ email });
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

// get users data
const getUserWithDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user = await user.populate('subscription')

        if (user.batches && user.batches.length > 0) {
            user = await user.populate('batches')
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// student current phase progress
const updateStudentCurrentPhase = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentPhase } = req.body;
        if (!currentPhase) {
            res.status(400).json({ message: "Please provide currentPhase" });
        }

        // Ensure the new phase ID is valid
        const phase = await Phase.findById(currentPhase);
        if (!phase) {
            return res.status(404).json({ message: 'Phase not found' });
        }

        // Find the student's progress document
        const studentProgress = await StudentProgress.findOne({ student: userId });
        if (!studentProgress) {
            return res.status(404).json({ message: 'Student progress not found' });
        }

        // Update the current phase
        studentProgress.currentPhase = currentPhase;

        // Save the updated document
        await studentProgress.save();

        res.status(200).json({ message: 'Student current phase updated successfully', studentProgress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// student current week progress
const updateStudentCurrentWeek = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentWeek } = req.body;

        if (!currentWeek) {
            res.status(400).json({ message: "Please provide currentWeek" });
        }
        // Ensure the new week ID is valid
        const week = await Week.findById(currentWeek);
        if (!week) {
            return res.status(404).json({ message: 'Week not found' });
        }

        // Find the student's progress document
        const studentProgress = await StudentProgress.findOne({ student: userId });
        if (!studentProgress) {
            return res.status(404).json({ message: 'Student progress not found' });
        }

        // Update the current week
        studentProgress.currentWeek = currentWeek;

        // Save the updated document
        await studentProgress.save();

        res.status(200).json({ message: 'Student current week updated successfully', studentProgress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// student current day progress
const updateStudentCurrentDay = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentDay } = req.body;
        if (!currentDay) {
            res.status(400).json({ message: "Please provide currentDay" });
        }
        // Ensure the new day ID is valid
        const day = await Day.findById(currentDay);
        if (!day) {
            return res.status(404).json({ message: 'Day not found' });
        }

        // Find the student's progress document
        const studentProgress = await StudentProgress.findOne({ student: userId });
        if (!studentProgress) {
            return res.status(404).json({ message: 'Student progress not found' });
        }

        // Update the current day
        studentProgress.currentDay = currentDay;

        // Save the updated document
        await studentProgress.save();

        res.status(200).json({ message: 'Student current day updated successfully', studentProgress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// update current student coin
const updateCoins = async (req, res) => {
    try {
        const userId = req.params.id;
        const { total_coins } = req.body;
        if (!total_coins) {
            return res.status(400).json({ message: "Please provide currentCoin" });
        }

        let userCoinProgress = await Coin.findOneAndUpdate(
            { student: userId },
            { total_coins },
            { new: true, runValidators: true }
        );

        if (!userCoinProgress) {
            return res.status(404).json({ message: "User progress not found" });
        }

        res.status(200).json(userCoinProgress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// create controller for get user all progress
const getUserWithProgress = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "Please provide userId" });
        }
        let userProgress = await StudentProgress.findOne({ student: userId })
        // console.log(userProgress)
        if (!userProgress) {
            return res.status(404).json({ message: "User not found" });
        }
        // userProgress = await userProgress.populate('student')
        userProgress = await userProgress.populate('currentPhase')
        userProgress = await userProgress.populate('currentWeek')
        userProgress = await userProgress.populate('currentDay')
        userProgress = await userProgress.populate('coins')
        if (userProgress.achievements && userProgress.achievements.length > 0) {
            userProgress = await userProgress.populate('achievements')
        }
        if (userProgress.progress_tracking && userProgress.progress_tracking.length > 0) {
            userProgress = await userProgress.populate('progress_tracking');
        }
        if (userProgress.sessions && userProgress.sessions.length > 0) {
            userProgress = await userProgress.populate('sessions')
        }
        if (userProgress.Lesson && userProgress.Lesson.length > 0) {
            userProgress = await userProgress.populate('Lesson')
        }
        if (userProgress.InteractiveExercise && userProgress.InteractiveExercise.length > 0) {
            userProgress = await userProgress.populate('InteractiveExercise')
        }
        if (!userProgress) {
            return res.status(404).json({ message: "User progress not found" });
        }

        res.status(200).json(userProgress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, getUserWithDetails, getUserWithProgress, updateStudentCurrentPhase, updateStudentCurrentWeek, updateStudentCurrentDay, updateCoins };

