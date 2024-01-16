"use client";
import { getMyBookings } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Style from "../../Home/all-tours.module.css";
import DataLoader from "../../Loader/DataLoader";

export default function MyBookings({ user, reqUserBookings }) {

    const { isLoading, data: userBookings, error } = useQuery({
        queryKey: ["user-bookings", user._id],
        queryFn: async () => {
            const bookings = await getMyBookings(user._id);
            return bookings
        },
        initialData: reqUserBookings
    });

    return (
        <>
            {!userBookings ? <DataLoader /> :
                <div className={`${Style["card-container"]}`}>
                    {userBookings ? userBookings?.map((tour) => (
                        <div key={tour.slug} className={Style.card}>

                            <div className={`${Style["card__header"]}`}>
                                <div className={`${Style["card__picture"]}`}>
                                    <div className={`${Style["card__picture-overlay"]}`}>&nbsp;</div>
                                    <Image className={`${Style["card__picture-img"]}`} src={`/img/tours/${tour.imageCover}`} alt={tour.name} width={300} height={350} />
                                </div>
                                <h3 className={`${Style["heading-tertirary"]}`}>
                                    <span>{tour.name}</span>
                                </h3>
                            </div>

                            <div className={`${Style["card__details"]}`}>
                                <h4 className={`${Style["card__sub-heading"]}`}>{tour.difficulty} {tour.duration}-day tour</h4>
                                <p className={`${Style["card__text"]}`}>{tour.summary}</p>
                                <div className={`${Style["card__data"]}`}>
                                    <svg className={`${Style["card__icon"]}`}>
                                        <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                                    </svg>
                                    <span>
                                        {tour.startLocation.description}
                                    </span>
                                </div>
                                <div className={`${Style["card__data"]}`}>
                                    <svg className={`${Style["card__icon"]}`}>
                                        <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                                    </svg>
                                    <span>
                                        {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        }).format(new Date(tour.startDates[0]))}
                                    </span>
                                </div>
                                <div className={`${Style["card__data"]}`}>
                                    <svg className={`${Style["card__icon"]}`}>
                                        <use xlinkHref="/img/icons.svg#icon-flag"></use>
                                    </svg>
                                    <span>
                                        {tour.locations.length} stops
                                    </span>
                                </div>
                                <div className={`${Style["card__data"]}`}>
                                    <svg className={`${Style["card__icon"]}`}>
                                        <use xlinkHref="/img/icons.svg#icon-user"></use>
                                    </svg>
                                    <span>
                                        {tour.maxGroupSize} people
                                    </span>
                                </div>
                                <div className={`${Style["card__data"]}`}>
                                    <svg className={`${Style["card__icon"]}`}>
                                        <use xlinkHref="/img/icons.svg#icon-heart"></use>
                                    </svg>
                                    <span>
                                        {tour.likesCount}
                                    </span>
                                </div>
                            </div>

                            <div className={`${Style["card__footer"]}`}>
                                <p>
                                    <span className={`${Style["card__footer-value"]}`} >
                                        {tour.price}
                                    </span>
                                    |
                                    <span className={`${Style["card__footer-text"]}`}>
                                        per person
                                    </span>
                                </p>
                                <p className={`${Style["card__ratings"]}`}>
                                    <span className={`${Style["card__footer-value"]}`} >
                                        {tour.ratingsAverage}
                                    </span>
                                    |
                                    <span className={`${Style["card__footer-text"]}`}>
                                        {tour.ratingsQuantity}
                                    </span>
                                </p>
                                <Link href={`/tour/${tour.slug}`} className={`${Style.btn} ${Style["btn--green"]}`}>
                                    Details
                                </Link>
                            </div>

                        </div>
                    )) : <p>No Bookings</p>}
                </div>}
        </>
    )
}
