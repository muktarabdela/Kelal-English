// create controller for user registration

const Week = require("../models/material/week");
const User = require("../models/student/studentModel");
const StudentProgress = require("../models/student/StudentProgress");
const Day = require("../models/material/day");
const Phase = require("../models/material/phase");
const Coin = require("../models/student/Coin");
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

        // Create/find the initial phase
        const phase = await Phase.create(
            { student: user._id, name: 'basic', currentPhase: 1, description: 'description', TotalPhases: 3, durationInWeeks: 4 },
        );

        // Create/find the initial week
        const week = await Week.create(
            { student: user._id, phase: phase._id, currentWeek: 1, overview: 'overview test', objectives: 'objectives test' },
            // { upsert: true, new: true }
        );

        // Create/find the initial day
        const day = await Day.create(
            { student: user._id, week: week._id, currentDay: 1, title: 'test title', textExplanation: 'textExplanation test' },
            // { upsert: true, new: true }
        );

        // Create/find the initial coin
        const coin = await Coin.create(
            { student: user._id, currentCoin: 0 }
        )

        // Create the initial progress for the user
        await StudentProgress.create({
            student: user._id,
            currentPhase: phase._id,
            currentWeek: week._id,
            currentDay: day._id,
            coins: coin._id, // or initial value
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
const updateCurrentPhase = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentPhase } = req.body;
        if (!currentPhase) {
            return res.status(400).json({ message: "Please provide currentPhase" });
        }

        let userPhaseProgress = await Phase.findOneAndUpdate(
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
const updateCurrentWeek = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentWeek } = req.body;
        if (!currentWeek) {
            return res.status(400).json({ message: "Please provide currentWeek" });
        }
        let userWeekProgress = await Week.findOneAndUpdate(
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
const updateCurrentDay = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentDay } = req.body;
        if (!currentDay) {
            return res.status(400).json({ message: "Please provide currentDay" });
        }
        let userDayProgress = await Day.findOneAndUpdate(
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
const getUserWithProgress = async (req, res) => {
    try {
        const userId = req.params.id;

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

module.exports = { register, login, getUserWithDetails, getUserWithProgress, updateCurrentPhase, updateCurrentWeek, updateCurrentDay, updateCoins };

