import connectMongoDB from "@/helpers/mongodb";
import Tour from "@/models/tourModel";

export const GET = async (req, res) => {

    //* Query Params
    const minDuration = req.nextUrl.searchParams.get("minDuration");
    const maxDuration = req.nextUrl.searchParams.get("maxDuration");
    const minPrice = req.nextUrl.searchParams.get("minPrice");
    const maxPrice = req.nextUrl.searchParams.get("maxPrice");

    const query = {};
    if (minDuration || maxDuration) {
        query.duration = {};
        if (minDuration) query.duration.$gte = minDuration;
        if (maxDuration) query.duration.$lte = maxDuration;
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
    }

    await connectMongoDB();

    let tours;
    if (query) {
        tours = await Tour.find(query);
    }

    if (!query) {
        tours = await Tour.find();
    }

    if (!tours) throw new Error("All Tours Fetching Fail from MongoDB...");

    return Response.json(tours, { status: 200 });
};
