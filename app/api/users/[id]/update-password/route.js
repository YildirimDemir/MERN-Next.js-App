import { hashPassword, verifyPassword } from "@/helpers/authBcrypt";
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

    const { passwordCurrent, newPassword, passwordConfirm } = await request.json();

    await connectMongoDB();
    const user = await User.findById({ _id: id });

    const isValid = await verifyPassword(passwordCurrent, user.password);
    if (!isValid) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Current password wrong..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Check your current password!" }, { status: 422 });
        }
    }

    if (newPassword !== passwordConfirm) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Passwords are not same..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Passwords do not match each other!" }, { status: 422 });
        }
    }

    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword }, {
        new: true,
        runValidators: true
    });

    if (!updatedUser) throw new Error("User update fail...");

    return Response.json("updatedUser", { status: 200 });
};