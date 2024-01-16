import connectMongoDB from "@/helpers/mongodb";
import Review from "@/models/reviewModel";
import { getServerSession } from "next-auth";

export const GET = async (req, res) => {

    await connectMongoDB();
    const reviews = await Review.find();

    if (!reviews) throw new Error("All Reviews Fetching Fail from MongoDB...");

    return Response.json(reviews, { status: 200 });
};


export const POST = async (request) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { comment: review, rating, userID: user, tourID: tour } = await request.json();

    const nRating = Number(rating);

    await connectMongoDB();
    const result = await Review.create({ review, rating: nRating, tour, user });

    if (!result) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Review Creating Fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json({ message: "Review Created" }, { status: 201 });

};