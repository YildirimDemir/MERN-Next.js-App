import connectMongoDB from "@/helpers/mongodb";
import Tour from "@/models/tourModel";

export const GET = async (req, res) => {

    await connectMongoDB();

    const page = + req.nextUrl.searchParams.get("page") || 1;
    const limit = 3;
    const startIndex = (page - 1) * limit;

    const totalTours = await Tour.countDocuments();

    const tours = await Tour.find().limit(limit).skip(startIndex);

    if (!tours) throw new Error("All Tours Fetching Fail from MongoDB...");

    const totalPageNumber = Math.ceil(totalTours / limit);

    return Response.json({ tours, totalPageNumber }, { status: 200 });
};