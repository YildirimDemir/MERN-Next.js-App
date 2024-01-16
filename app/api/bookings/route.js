import connectMongoDB from "@/helpers/mongodb";
import Booking from "@/models/bookingModel";
import { getServerSession } from "next-auth";

export const GET = async (req, res) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    await connectMongoDB();
    const bookings = await Booking.find();

    if (!bookings) throw new Error("All Bookings Fetching Fail from MongoDB...");

    return Response.json(bookings, { status: 200 });
};


export const POST = async (request) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    await connectMongoDB();
    const result = await Booking.create(request.json());

    if (!result) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Booking Creating fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json({ message: "Booking Created" }, { status: 201 });

};