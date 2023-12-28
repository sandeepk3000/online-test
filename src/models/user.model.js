import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    type: {
        type: String,
    },
    fullname: {
        type: String,
    },
    avatar: {
        type: String,
        require: true
    },
    coverImage: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    refreshToken: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    }]
}, { timestamps: true })
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)