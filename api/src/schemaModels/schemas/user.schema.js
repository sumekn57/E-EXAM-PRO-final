import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "student", "teacher"],
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

export default userSchema;