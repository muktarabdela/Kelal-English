const jwt = require('jsonwebtoken');
const User = require('../models/student/studentModel');
const SuperAdmin = require('../models/superAdmin');

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Assuming token is passed as Bearer token
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decode", decoded);
        // Atach the user to jobs route
        req.user = { email: decoded.email, userId: decoded.userId, subscription: decoded.subscription, role: decoded.role };

        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// function to check if the user is subscribed
const checkSubscription = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const email = req.user.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'check subscription user not found' });
        }
        if (user.subscription.status !== "active") {
            return res.status(401).json({ message: 'user not subscribed' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}
// function to check if the user is admin   
const checkAdmin = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const email = req.user.email;
        const user = await SuperAdmin.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'admin user not found' });
        }
        if (user.role !== 'super-admin') {
            return res.status(401).json({ message: 'user not admin' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

// function for check use is student
const checkStudent = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const email = req.user.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'user not found' });
        }
        if (user.role !== 'student') {
            return res.status(401).json({ message: 'user not student' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}
const authMiddleware = {
    verifyToken,
    checkSubscription,
    checkAdmin,
    checkStudent
}

module.exports = authMiddleware;

