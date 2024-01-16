import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";

export const PATCH = async (request, { params }) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { id } = params;
    if (!id) throw new Error("ID not found...");

    const { basket } = await request.json();

    await connectMongoDB();

    await User.findByIdAndUpdate({ _id: id }, { basket });

    return Response.json("updatedUser", { status: 200 });
};