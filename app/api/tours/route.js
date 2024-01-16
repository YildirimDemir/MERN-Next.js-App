import connectMongoDB from "@/helpers/mongodb";
import Tour from "@/models/tourModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";

export const GET = async (req, res) => {

    await connectMongoDB();

    const tours = await Tour.find();

    if (!tours) throw new Error("All Tours Fetching Fail from MongoDB...");

    return Response.json(tours, { status: 200 });
};

export const POST = async (request) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    await connectMongoDB();

    const user = await User.findOne({ email: session.user.email });

    if (user.role !== "admin") {
        return Response.json({ message: "You don't have the authority" }, { status: 401 });
    }

    const result = await Tour.create(request.json());

    if (!result) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Tour Creating fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json({ message: "Tour Created" }, { status: 201 });

};