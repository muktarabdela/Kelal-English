const mongoose = require("mongoose");
const userAchievementSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    achievement_id: { type: mongoose.Schema.Types.ObjectId, ref: "Achievement", required: true },
    awarded_date: { type: Date, default: Date.now }
});

const UserAchievement = mongoose.model("UserAchievement", userAchievementSchema);
module.exports = UserAchievement;
