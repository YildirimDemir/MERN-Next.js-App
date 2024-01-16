import connectMongoDB from "@/helpers/mongodb";
import Review from "@/models/reviewModel";
import { getServerSession } from "next-auth";

export const GET = async (request, { params }) => {

    const { id } = params;

    if (!id) throw new Error("ID not found...");

    await connectMongoDB();
    const review = await Review.findOne({ _id: id });

    if (!review) throw new Error("Review not found on ID...");

    return Response.json(review, { status: 200 });
};

export const PATCH = async (request, { params }) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { id } = params;

    if (!id) throw new Error("ID not found...");

    await connectMongoDB();
    const updatedReview = await Review.findByIdAndUpdate({ _id: id }, request.json(), {
        new: true,
        runValidators: true
    });

    if (!updatedReview) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Review update fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json(updatedReview, { status: 200 });
};

export const DELETE = async (request, { params }) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { id } = params;

    if (!id) throw new Error("ID not found...");

    await connectMongoDB();
    const result = await Review.findByIdAndDelete({ _id: id });

    if (!result) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Review delete fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json(null, { status: 204 });
};