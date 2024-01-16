import connectMongoDB from "@/helpers/mongodb";
import Like from "@/models/likeModel";
import Tour from "@/models/tourModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";

export const GET = async (req, res) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    await connectMongoDB();
    const likes = await Like.find().populate({
        path: "user",
        select: "name photo"
    }).populate({
        path: "tour",
        select: "name"
    });

    if (!likes) throw new Error("All Likes Fetching Fail from MongoDB...");

    return Response.json(likes, { status: 200 });
};


export const POST = async (request) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { like, tour } = await request.json();

    await connectMongoDB();

    await Tour.findByIdAndUpdate({ _id: tour._id }, { likesCount: tour.likesCount + 1 });

    const user = await User.findOne({ email: session.user.email });

    const result = await Like.create({ like, tour, user: user._id });

    if (!result) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Like Creating fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json({ message: "Looking Created" }, { status: 201 });

};