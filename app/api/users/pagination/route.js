import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";

export const GET = async (req, res) => {

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

    const page = + req.nextUrl.searchParams.get("page") || 1;
    const limit = 9;
    const startIndex = (page - 1) * limit;

    const totalUsers = await User.countDocuments();

    const users = await User.find().limit(limit).skip(startIndex);

    if (!users) throw new Error("All Users Fetching Fail from MongoDB...");

    const totalPageNumber = Math.ceil(totalUsers / limit);

    return Response.json({ users, totalPageNumber }, { status: 200 });
};