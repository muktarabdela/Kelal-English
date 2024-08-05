const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

// Define the User schema
const supperAdminSchema = new mongoose.Schema({
    full_name: { type: String, required: [true, "Full name is required"] },
    email: {
        type: String, required: [true, "Email is required"], match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    phone: {
        type: String, required: [true, "Phone number is required"],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number. It should be exactly 10 digits.`,
        },
    },
    password: { type: String, required: [true, "Password is required"] },
    role: { type: String, default: 'super-admin' },
});

// Pre-save hook to hash the password before saving
supperAdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to create a JWT
supperAdminSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, role: this.role, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
}

// Method to compare passwords
supperAdminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const SuperAdmin = mongoose.model("SuperAdmin", supperAdminSchema);
module.exports = SuperAdmin;
