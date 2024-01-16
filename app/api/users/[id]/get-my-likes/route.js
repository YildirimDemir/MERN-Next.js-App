import connectMongoDB from "@/helpers/mongodb";
import Like from "@/models/likeModel";
import Tour from "@/models/tourModel";
import { getServerSession } from "next-auth";

export const GET = async (request, { params }) => {

    //* Api Protect => Session Check
    // const session = await getServerSession();
    // if (!session) {
    //     return Response.json({ message: "You are not allowed!" }, { status: 401 });
    // }

    const { id } = params;

    if (!id) return Response.json({ message: "ID not found..." }, { status: 422 });

    await connectMongoDB();

    const userLikes = await Like.find({ user: id });

    // if (!userLikes || userLikes.length === 0) {
    //     if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
    //         return Response.json({ message: "User Like not found on ID..." }, { status: 422 });
    //     }
    //     else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
    //         return Response.json({ message: "You haven't liked any tours!" }, { status: 422 });
    //     }
    // }

    const toursIDs = userLikes.map(item => item.tour);

    const likeTours = await Tour.find({ _id: { $in: toursIDs } });

    return Response.json(likeTours, { status: 200 });
};