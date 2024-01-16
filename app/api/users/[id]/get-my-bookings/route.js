import connectMongoDB from "@/helpers/mongodb";
import Booking from "@/models/bookingModel";
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

    const userBooking = await Booking.find({ user: id });

    if (!userBooking) {
        if (process.env.NEXT_RUNTIME_NODE_ENV === "development") {
            return Response.json({ message: "In Booking not found this user id..." }, { status: 422 });
        }
        else if (process.env.NEXT_RUNTIME_NODE_ENV === "production") {
            return Response.json({ message: "You don't have a booking!" }, { status: 422 });
        }
    };

    const toursIDs = userBooking.map(item => item.tour);

    const bookingTours = await Tour.find({ _id: { $in: toursIDs } });

    return Response.json(bookingTours, { status: 200 });
};