// create user route
const express = require("express");
const router = express.Router();
const { register, login, addBatch, addAchievements, updateSubscription, addBatchForUser, addPhase, addWeeks, addDays, postStudentDailyLessons, postInteractiveExercise } = require("../controller/supperAdminController");
const authMiddleware = require("../middleware/auth");

router.post("/super-admin/register", register);
router.post("/super-admin/login", login);

// add batch route
router.post("/super-admin/batch/create", authMiddleware.verifyToken, authMiddleware.checkAdmin, addBatch);
// subscribe route
router.put("/super-admin/subscribe/:id", authMiddleware.verifyToken, authMiddleware.checkAdmin, updateSubscription);
// add batch for user 
router.put("/super-admin/batch/:id", authMiddleware.verifyToken, authMiddleware.checkAdmin, addBatchForUser);
// post student daily lessons
router.post("/super-admin/student/lessons/:id", authMiddleware.verifyToken, authMiddleware.checkAdmin, postStudentDailyLessons);
// add interactive exercises
router.post("/super-admin/interactive-exercise/:id", authMiddleware.verifyToken, authMiddleware.checkAdmin, postInteractiveExercise);
// ጊዛዊ
// add achievement route
router.post("/super-admin/achievement/create", authMiddleware.verifyToken, authMiddleware.checkAdmin, addAchievements);
// add phase
router.post("/super-admin/phase/create", authMiddleware.verifyToken, authMiddleware.checkAdmin, addPhase);
// add week
router.post("/super-admin/week/create", authMiddleware.verifyToken, authMiddleware.checkAdmin, addWeeks);
// add day
router.post("/super-admin/day/create", authMiddleware.verifyToken, authMiddleware.checkAdmin, addDays);


module.exports = router