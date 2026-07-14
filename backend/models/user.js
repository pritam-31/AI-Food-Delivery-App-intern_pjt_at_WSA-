//Schema
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");
const { kMaxLength } = require("buffer");
const { match } = require("assert");

//create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxlength: [30, "Name can't exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "please enter email-id"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Enter password"],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Confirm password"],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: "Password are not same"
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Enter valid phone number"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: {
        public_id: String,
        url: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, 
{
    timestamps: true
});

//hash password
//pre("save") => runs before data is saved

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

//pass compare at login time
userSchema.methods.comparePassword = async function( candidatePassword, userPassword ) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

//check whether the user's pass is changed after getting JWT token
//if yes, the old token is invalid and user must log in again
userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, 10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

//Custom method to generate JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPRIES }
    )
}

module.exports = mongoose.model("User", userSchema);