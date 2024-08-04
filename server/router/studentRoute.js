// create user route
const express = require("express");
const router = express.Router();
const { register, login, getUserWithDetails, getUserWithProgress, updateCurrentPhase, updateCurrentWeek, updateCurrentDay, updateCoins } = require("../controller/studentController");
const auth = require("../middleware/auth");
const authMiddleware = require("../middleware/auth");

router.post("/user/register", register);
router.post("/user/login", login);
// get users data
router.get('/user/detail/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, getUserWithDetails);

// get users detail progress
router.get('/user/progress/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, getUserWithProgress);

// Update current phase
router.put('/user/progress/phase/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, updateCurrentPhase);

// Update current week
router.put('/user/progress/week/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, updateCurrentWeek);

// Update current day
router.put('/user/progress/day/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, updateCurrentDay);
// update current student coin
router.put('/user/progress/coin/:id', authMiddleware.verifyToken, authMiddleware.checkSubscription, updateCoins);

module.exports = router