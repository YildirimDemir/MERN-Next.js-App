import connectMongoDB from '@/helpers/mongodb';
import User from '@/models/userModel';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';

export const POST = async (request, res) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    await connectMongoDB();

    const user = await User.findOne({ email: session.user.email });

    try {

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const tour = await request.json();

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `${tour.name} Tour`,
                            description: tour.summary,
                            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`]
                        },
                        unit_amount: tour.price * 100,
                    },
                    quantity: 1,
                },
            ],
            client_reference_id: user._id,
            metadata: {
                tourId: tour._id,
            },
            mode: 'payment',
            success_url: `http://localhost:3000`,
            cancel_url: `http://localhost:3000`,
        });

        return Response.json(session.url, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
};
