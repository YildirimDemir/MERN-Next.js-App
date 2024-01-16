import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    photo: {
        type: String,
        default: "default.jpg"
    },
    role: {
        type: String,
        enum: ["user", "guide", "lead-guide", "admin"],
        default: "user"
    },
    basket: {
        type: Array,
        default: []
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            //* This only works on CREATE and SAVE!!!
            validator: function (val) {
                return val === this.password;
            },
            message: "Passwords are not the same!"
        }
    },
    passwordChangeAt: Date,
    resetToken: String,
    resetTokenExpiry: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

//! Virtual Populate
// userSchema.virtual("bookings", {
//     ref: "Booking",
//     foreignField: "user",
//     localField: "_id"
// });

// userSchema.virtual("likes", {
//     ref: "Like",
//     foreignField: "user",
//     localField: "_id"
// });

// userSchema.virtual("reviews", {
//     ref: "Review",
//     foreignField: "user",
//     localField: "_id"
// });

//! Active Control Request User Query
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;