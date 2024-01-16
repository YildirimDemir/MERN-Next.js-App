import connectMongoDB from "@/helpers/mongodb";
import Tour from "@/models/tourModel";
import { getServerSession } from "next-auth";

export const GET = async (request, { params }) => {

    //* Api Protect => Session Check
    // const session = await getServerSession();
    // if (!session) {
    //     return Response.json({ message: "You are not allowed!" }, { status: 401 });
    // }

    const { id } = params;

    if (!id) throw new Error("ID not found...");

    await connectMongoDB();

    const tours = await Tour.find().populate("reviews");

    let reviews = [];

    tours.map(tour => tour.reviews.map(review => reviews.push(review)));

    const userReview = reviews.filter(review => review.user.id === id);

    if (!userReview) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "User Review not found on ID..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "You haven't review on any tours!" }, { status: 422 });
        }
    }

    const data = userReview.map(review => {
        return { tourName: review.tour.name, tourSlug: review.tour.slug, userReview: review.review, reviewRating: review.rating };
    });

    return Response.json(data, { status: 200 });
};