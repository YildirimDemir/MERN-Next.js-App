import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";

export const GET = async (request, { params }) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { id } = params;

    if (!id) throw new Error("ID not found...");

    await connectMongoDB();

    const requestUser = await User.findOne({ email: session.user.email });

    if (requestUser.role !== "admin") {
        return Response.json({ message: "You don't have the authority" }, { status: 401 });
    }

    const user = await User.findOne({ _id: id });

    if (!user) throw new Error("User not found on ID...");

    return Response.json(user, { status: 200 });
};

export const DELETE = async (request, { params }) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { id } = params;

    if (!id) throw new Error("ID not found...");

    await connectMongoDB();

    const requestUser = await User.findOne({ email: session.user.email });

    if (requestUser.role !== "admin") {
        return Response.json({ message: "You don't have the authority" }, { status: 401 });
    }

    await User.findByIdAndDelete({ _id: id });

    return Response.json(null, { status: 200 });
};