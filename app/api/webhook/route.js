import connectMongoDB from '@/helpers/mongodb';
import Booking from '@/models/bookingModel';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (request, res) => {

    //* Api Protect => Session Check
    const session = await getServerSession();
    if (!session) {
        return Response.json({ message: "You are not allowed!" }, { status: 401 });
    }

    await connectMongoDB();

    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            await Booking.create({
                user: session.client_reference_id,
                tour: session.metadata.tourId,
                price: session.amount_total / 100
            });
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });

};
