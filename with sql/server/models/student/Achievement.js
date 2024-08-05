const mongoose = require("mongoose");
const achievementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    badge_image_url: { type: String, required: true }
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
