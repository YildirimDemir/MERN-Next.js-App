import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";

export const GET = async (request, { params }) => {

    //* Api Protect => Session Check
    // const session = await getServerSession();
    // if (!session) {
    //     return Response.json({ message: "You are not allowed!" }, { status: 401 });
    // }

    const { email } = params;

    if (!email) return Response.json({ message: "Email not found..." }, { status: 401 });

    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) return Response.json({ message: "User not found this email..." }, { status: 401 });

    return Response.json(user, { status: 200 });
};