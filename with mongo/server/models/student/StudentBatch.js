const mongoose = require("mongoose");
const studentBatchSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    batch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    enrollment_date: { type: Date, default: Date.now }
});

const StudentBatch = mongoose.model("StudentBatch", studentBatchSchema);
module.exports = StudentBatch;
