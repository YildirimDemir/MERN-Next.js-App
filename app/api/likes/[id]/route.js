import connectMongoDB from "@/helpers/mongodb";
import Like from "@/models/likeModel";
import Tour from "@/models/tourModel";
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

    const like = await Like.findOne({ _id: id });

    if (!like) throw new Error("Like not found on ID...");

    return Response.json(like, { status: 200 });
};

export const DELETE = async (request, { params }) => {

    try {
        //* Api Protect => Session Check
        const session = await getServerSession();
        if (!session) {
            return Response.json({ message: "You are not allowed!" }, { status: 401 });
        }

        const { id } = params;

        if (!id) throw new Error("ID not found...");

        await connectMongoDB();

        const { getTour } = await request.json();

        await Tour.findByIdAndUpdate({ _id: getTour._id }, { likesCount: getTour.likesCount - 1 });

        const result = await Like.findByIdAndDelete({ _id: id });

        if (!result) {
            const message = process.env.NEXT_RUNTIME_NODE_ENV === "development"
                ? "Like delete fail..."
                : "Something went wrong!";

            return Response.json({ message }, { status: 422 });
        }

        return Response.json(null, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }

};