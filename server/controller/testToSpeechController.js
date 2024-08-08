const { default: axios } = require("axios");
const Week = require("../models/material/week");
const testToSpeech = async (req, res) => {
    try {

        const text = req.body.text
        const apiKey = process.env.API_KEY
        console.log(apiKey)
        const endPoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
        const payload = {
            "audioConfig": {
                "audioEncoding": "LINEAR16",
                "pitch": 0,
                "speakingRate": 1
            },
            "input": {
                "text": text
            },
            "voice": {
                "languageCode": "en-US",
                "name": "en-US-Standard-F"
            }
        }

        const response = await axios.post(endPoint, payload);
        res.status(200).json({ data: response.data, text: text });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { testToSpeech };
