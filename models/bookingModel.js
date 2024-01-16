import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    tour: {
        type: Schema.ObjectId,
        ref: "Tour",
        required: [true, "Booking must belong to a Tour!"]
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: [true, "Booking must belong to a User!"]
    },
    price: {
        type: Number,
        required: [true, "Booking must have a price!"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

//! Query Middleware
bookingSchema.pre(/^find/, function (next) {
    this.populate("user").populate({
        path: "tour",
        select: "name"
    });

    next();
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking; 