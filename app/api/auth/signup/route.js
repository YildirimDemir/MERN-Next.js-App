import { hashPassword } from "@/helpers/authBcrypt";
import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";

export const POST = async (request, res) => {

    const { name, email, password, passwordConfirm } = await request.json();
    await connectMongoDB();

    if (!email || !email.includes("@") || !password || password.trim().length < 7) {
        return Response.json({ message: "Invalid input - password should also be at least 7 characters long." }, { status: 422 });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "There is already a user registered with this email!" }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "User exists already!" }, { status: 422 });
        }
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
    await User.create({ name, email, password: hashedPassword, passwordConfirm: hashedPassword });

    return Response.json({ message: "User Created" }, { status: 201 });

};
