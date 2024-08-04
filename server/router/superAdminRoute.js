// create user route
const express = require("express");
const router = express.Router();
const { register, login, addBatch, addAchievements, updateSubscription, addBatchForUser } = require("../controller/supperAdminController");
const authMiddleware = require("../middleware/auth");

router.post("/super-admin/register", register);
router.post("/super-admin/login", login);

// add batch route
router.post("/super-admin/batch/create", authMiddleware.verifyToken, authMiddleware.checkAdmin, addBatch);
// add achievement route
router.post("/super-admin/achievement/create", authMiddleware.verifyToken, authMiddleware.checkAdmin, addAchievements);

// subscribe route
router.put("/super-admin/subscribe/:id", authMiddleware.verifyToken, authMiddleware.checkAdmin, updateSubscription);
// add batchs for user 
router.put("/super-admin/batch/:id", authMiddleware.verifyToken, authMiddleware.checkAdmin, addBatchForUser);

module.exports = router