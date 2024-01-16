import { createCheckoutStripe } from '@/services/apiBookings';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from "next/link";
import { toast } from 'react-hot-toast';
import Style from "../tour-detail.module.css";

export default function TourCTA({ tour, reqUser }) {

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCheckoutStripe,
        onSuccess: () => {
            toast.success("New Checkout Session successfully sending...");
        },
        onError: (err) => toast.error(err.message),
    });

    function handlePayment() {
        mutate(tour);
    }

    return (
        <section className={`${Style["section-cta"]}`}>
            <div className={Style.cta}>
                <div className={`${Style["cta__img"]} ${Style["cta__img--logo"]}`}>
                    <Image className={`${Style["cta__img"]} ${Style["cta__img--1"]}`} src="/img/logo-white.png" alt="Natours Logo" width={250} height={300} />
                </div>
                <Image className={`${Style["cta__img"]} ${Style["cta__img--1"]}`} src={`/img/tours/${tour.images[1]}`} alt="Tour Picture" width={250} height={300} />
                <Image className={`${Style["cta__img"]} ${Style["cta__img--2"]}`} src={`/img/tours/${tour.images[2]}`} alt="Tour Picture" width={250} height={300} />
                <div className={`${Style["cta__content"]}`}>
                    <h2 className={`${Style["heading-secondary"]}`}>What are you waiting for?</h2>
                    <p className={`${Style["cta__text"]}`}>{tour.duration} days. 1 adventure. Infinite memories. Make it yours today!</p>
                    {reqUser ?
                        <button className={`${Style.btn} ${Style["btn--green"]} ${Style["span-all-rows"]}`} onClick={handlePayment}>Booking tour now!</button>
                        :
                        <Link className={`${Style.btn} ${Style["btn--green"]} ${Style["span-all-rows"]}`} href="/login">Log in to book tour!</Link>}
                </div>
            </div>
        </section>
    )
}
