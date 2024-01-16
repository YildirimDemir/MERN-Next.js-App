import connectMongoDB from "@/helpers/mongodb";
import Review from "@/models/reviewModel";

export const GET = async (req, res) => {

    await connectMongoDB();

    const page = + req.nextUrl.searchParams.get("page") || 1;
    const limit = 3;
    const startIndex = (page - 1) * limit;

    const totalReviews = await Review.countDocuments();

    const reviews = await Review.find().limit(limit).skip(startIndex);

    if (!reviews) throw new Error("All Tours Fetching Fail from MongoDB...");

    const totalPageNumber = Math.ceil(totalReviews / limit);

    return Response.json({ reviews, totalPageNumber }, { status: 200 });
};