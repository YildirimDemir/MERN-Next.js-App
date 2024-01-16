import { hashPassword } from "@/helpers/authBcrypt";
import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const PATCH = async (request, res) => {

    const { token, password, passwordConfirm } = await request.json();

    await connectMongoDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetToken: hashedToken,
        resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return NextResponse.json("Invalid token or has expired", { status: 400 });
    }

    if (password !== passwordConfirm) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Passwords are not same..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Passwords do not match each other!" }, { status: 422 });
        }
    }

    const hashedPassword = await hashPassword(password);
    const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, { password: hashedPassword, resetToken: null, resetTokenExpiry: null }, {
        new: true,
        runValidators: true
    });

    if (!updatedUser) throw new Error("Password reset fail...");

    return Response.json("updatedUser", { status: 200 });
};