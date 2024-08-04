const mongoose = require("mongoose");
const coinSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    total_coins: { type: Number, default: 0 }
});

const Coin = mongoose.model("Coin", coinSchema);
module.exports = Coin;
