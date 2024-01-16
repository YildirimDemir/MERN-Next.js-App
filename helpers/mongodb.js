import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        throw new Error("Connect Fail to MongoDB..." + error.message);
    }
};

export default connectMongoDB;