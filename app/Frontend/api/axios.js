import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;