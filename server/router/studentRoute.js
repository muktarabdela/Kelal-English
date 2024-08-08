// create user route
const express = require("express");
const router = express.Router();
const { register, login, getUserWithDetails, getUserWithProgress, updateStudentCurrentPhase, updateStudentCurrentWeek, updateStudentCurrentDay, updateCoins, getStudentDailyLessons, getStudentInteractiveExercise } = require("../controller/studentController");
const auth = require("../middleware/auth");
const authMiddleware = require("../middleware/auth");

router.post("/user/register", register);
router.post("/user/login", login);
// get users data
router.get('/user/detail/:id', authMiddleware.verifyToken, getUserWithDetails);
// get student lesson
router.get('/user/lesson/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, getStudentDailyLessons);
// get user daily lesson interactive exercise
router.get('/user/interactive-exercise/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, getStudentInteractiveExercise);
// get users detail progress
router.get('/user/progress/:id', authMiddleware.verifyToken, getUserWithProgress);

// Update current phase
router.put('/user/progress/phase/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, updateStudentCurrentPhase);

// Update current week
router.put('/user/progress/week/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, updateStudentCurrentWeek);

// Update current day
router.put('/user/progress/day/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, updateStudentCurrentDay);
// update current student coin
router.put('/user/progress/coin/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, updateCoins);

module.exports = router