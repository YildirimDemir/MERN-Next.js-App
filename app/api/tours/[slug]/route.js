import connectMongoDB from "@/helpers/mongodb";
import Tour from "@/models/tourModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";

export const GET = async (request, { params }) => {

    const { slug } = params;

    if (!slug) throw new Error("Slug not found...");

    await connectMongoDB();
    const tour = await Tour.findOne({ slug }).populate("reviews");

    if (!tour) throw new Error("Tour not found on slug...");

    return Response.json(tour, { status: 200 });
};

export const PATCH = async (request, { params }) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { slug } = params;

    if (!slug) throw new Error("Slug not found...");

    await connectMongoDB();

    const user = await User.findOne({ email: session.user.email });

    if (user.role !== "admin") {
        return Response.json({ message: "You don't have the authority" }, { status: 401 });
    }

    const selectedTour = await Tour.findOne({ slug });

    if (!selectedTour) throw new Error("Tour not found on slug...");

    const updatedTour = await Tour.findByIdAndUpdate({ _id: selectedTour._id }, request.json(), {
        new: true,
        runValidators: true
    });

    if (!updatedTour) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Tour update fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json(updatedTour, { status: 200 });
};

export const DELETE = async (request, { params }) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { slug } = params;

    if (!slug) throw new Error("Slug not found...");

    await connectMongoDB();

    const user = await User.findOne({ email: session.user.email });

    if (user.role !== "admin") {
        return Response.json({ message: "You don't have the authority" }, { status: 401 });
    }

    const selectedTour = await Tour.findOne({ slug });

    if (!selectedTour) throw new Error("Tour not found on slug...");

    const result = await Tour.findByIdAndDelete({ _id: selectedTour._id });

    if (!result) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Tour delete fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json(null, { status: 204 });
};