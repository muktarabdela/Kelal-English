const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Batch name is required"] },
    start_date: { type: Date, required: [true, "Batch start date is required"] },
    telegram_group: { type: String, required: [true, "Telegram group is required"] }
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;
