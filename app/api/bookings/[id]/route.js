import connectMongoDB from "@/helpers/mongodb";
import Booking from "@/models/bookingModel";
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
    const booking = await Booking.findOne({ _id: id });

    if (!booking) throw new Error("Booking not found on ID...");

    return Response.json(booking, { status: 200 });
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
    const updatedBooking = await Booking.findByIdAndUpdate({ _id: id }, request.json(), {
        new: true,
        runValidators: true
    });

    if (!updatedBooking) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Booking Update fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json(updatedBooking, { status: 200 });
};

export const DELETE = async (request, { params }) => {

    //* Api Protect => Session Gelen Bilgiyle Kullanıcının girişli olup olmadığını anlamak
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    const { id } = params;

    if (!id) throw new Error("ID not found...");

    await connectMongoDB();
    const result = await Booking.findByIdAndDelete({ _id: id });

    if (!result) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "Booking delete fail..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "Something went wrong!" }, { status: 422 });
        }
    }

    return Response.json(null, { status: 204 });
};