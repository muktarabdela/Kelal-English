// crate route for /test-to-speech
const express = require("express");
const { testToSpeech } = require("../controller/testToSpeechController");
const router = express.Router();


router.post("/test-to-speech", testToSpeech);


module.exports = router