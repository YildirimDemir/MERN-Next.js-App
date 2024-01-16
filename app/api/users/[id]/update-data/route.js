import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import path from "path";
import sharp from "sharp";

export const PATCH = async (request, { params }) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { id } = params;
    if (!id) throw new Error("ID not found...");

    await connectMongoDB();

    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');

    const alreadyEmailUser = await User.findOne({ email });
    if (alreadyEmailUser && alreadyEmailUser.id !== id) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Email already in use by another user..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "This email cannot be used!" }, { status: 422 });
        }
    }

    let fileInfo;

    const uploadedFile = formData.get('files');

    if (uploadedFile) {
        const fileName = `user-${id}-${Date.now()}.jpeg`;

        const filePath = path.join('public', 'img', 'users', fileName);

        const buffer = await uploadedFile.arrayBuffer();

        await sharp(Buffer.from(buffer))
            .resize(500, 500)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(filePath);

        fileInfo = { name: fileName, path: filePath };
    }

    const updateData = { name, email };
    if (fileInfo) {
        updateData.photo = fileInfo.name;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!updatedUser) throw new Error("User update failed...");

    return Response.json({ message: "updatedUser" }, { status: 200 });
};
