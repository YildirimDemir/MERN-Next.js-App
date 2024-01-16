import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    like: {
        type: Boolean,
        required: [true, "Like can not be empty!"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tour:
    {
        type: Schema.ObjectId,
        ref: "Tour",
        required: [true, "Like must belong to a tour."]
    },
    user:
    {
        type: Schema.ObjectId,
        ref: "User",
        required: [true, "Like must belong to a user."]
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

//! Query Middleware
likeSchema.pre(/^find/, function (next) {

    this.populate({
        path: "tour",
        select: "name slug likesCount"
    });

    this.populate({
        path: "user",
        select: "name photo"
    });

    next();
});

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;