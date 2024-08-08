// create controller for user registration

const Week = require("../models/material/week");
const User = require("../models/student/studentModel");
const StudentProgress = require("../models/student/StudentProgress");
const Day = require("../models/material/day");
const Phase = require("../models/material/phase");
const Coin = require("../models/student/Coin");
const Lesson = require("../models/material/lesson");
const InteractiveExercise = require("../models/material/interActive/InteractiveExercise");
const register = async (req, res) => {
    try {
        // check if user already exists
        const alreadyRegistered = await User.findOne({ email: req.body.email });
        if (alreadyRegistered) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // check if phone number already exists 
        const phoneExists = await User.findOne({ phone: req.body.phone });
        if (phoneExists) {
            return res.status(400).json({ message: "Phone number already exists" });
        }
        // Create the user
        const user = await User.create(req.body);

        // Create the initial progress for the user
        await StudentProgress.create({
            student: user._id,
            currentPhase: 1,
            currentWeek: 1,
            currentDay: 1,
            coins: 1, // or initial value
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
// create controller for get student daily lessons
const getStudentDailyLessons = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: "Please provide userId" });
        }

        // Find the student's progress
        const studentProgress = await StudentProgress.findOne({ student: userId });

        if (!studentProgress) {
            return res.status(404).json({ message: "Student progress not found" });
        }

        const { currentPhase, currentWeek, currentDay } = studentProgress;
        // Find all lessons and populate day, phase, and week references
        const lessons = await Lesson.find({})
            .populate('day')
            .populate('phase')
            .populate('week');

        // Filter lessons that match the student's current phase, week, and day
        const matchingLessons = lessons.filter(lesson => {
            return lesson.phase.phaseNumber.toString() === currentPhase.toString() &&
                lesson.week.weekNumber.toString() === currentWeek.toString() &&
                lesson.day.dayNumber.toString() === currentDay.toString();
        });

        if (matchingLessons.length === 0) {
            return res.status(404).json({ message: "No matching lessons found" });
        }

        res.status(200).json(matchingLessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// get student interactive exercise by lesson id
const getStudentInteractiveExercise = async (req, res) => {
    try {
        const lessonId = req.params.id;
        if (!lessonId) {
            return res.status(400).json({ message: "Please provide lessonId" });
        }

        const interactiveExercises = await InteractiveExercise.find({ lesson: lessonId });
        if (interactiveExercises.length === 0) {
            return res.status(404).json({ message: "Interactive exercises not found" });
        }

        res.status(200).json(interactiveExercises);
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
            return res.status(400).json({ message: "Please provide currentPhase" });
        }

        let userPhaseProgress = await StudentProgress.findOneAndUpdate(
            { student: userId },
            { currentPhase },
            { new: true, runValidators: true }
        );

        if (!userPhaseProgress) {
            return res.status(404).json({ message: "User progress not found" });
        }

        res.status(200).json(userPhaseProgress);
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
            return res.status(400).json({ message: "Please provide currentWeek" });
        }
        let userWeekProgress = await StudentProgress.findOneAndUpdate(
            { student: userId },
            { currentWeek },
            { new: true, runValidators: true }
        );
        if (!userWeekProgress) {
            return res.status(404).json({ message: "User progress not found" });
        }

        res.status(200).json(userWeekProgress);
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
            return res.status(400).json({ message: "Please provide currentDay" });
        }
        let userDayProgress = await StudentProgress.findOneAndUpdate(
            { student: userId },
            { currentDay },
            { new: true, runValidators: true }
        );

        if (!userDayProgress) {
            return res.status(404).json({ message: "User progress not found" });
        }

        res.status(200).json(userDayProgress);
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

module.exports = { register, login, getUserWithDetails, getUserWithProgress, updateStudentCurrentPhase, updateStudentCurrentWeek, updateStudentCurrentDay, updateCoins, getStudentDailyLessons, getStudentInteractiveExercise };

