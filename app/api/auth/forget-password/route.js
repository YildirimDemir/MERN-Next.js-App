import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export const POST = async (request, res) => {

    const { email } = await request.json();

    await connectMongoDB();

    if (!email || !email.includes("@")) {
        return Response.json({ message: "Invalid input" }, { status: 422 });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "There is not found a user registered with this email!" }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Email address is not available!" }, { status: 422 });
        }
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    console.log(passwordResetToken);

    const passwordResetExpires = Date.now() + 3600000;

    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    const resetUrl = `${process.env.LOCAL_HOST}/reset-password/${resetToken}`;

    const body = `Reset Password by clicking on following url: ${resetUrl}`;

    const msg = {
        to: email,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject: "Reset Password",
        text: body
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    sgMail.send(msg)
        .then(() => {
            return NextResponse.json("Reset password email is sent.", { status: 200 });
        }).catch(async (error) => {
            existingUser.resetToken = null;
            existingUser.resetTokenExpiry = null;
            await existingUser.save({ validateBeforeSave: false });

            return NextResponse.json("Failed sending email. Try again!", { status: 400 });
        });

    try {
        await existingUser.save({ validateBeforeSave: false });
        return NextResponse.json("Email is sent for resetting password.", { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }

};
