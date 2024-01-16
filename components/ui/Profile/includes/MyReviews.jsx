"use client";
import { getMyReviews } from "@/services/apiReviews";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Style from "../../Detail/tour-detail.module.css";
import DataLoader from "../../Loader/DataLoader";

export default function MyReviews({ user, reqUserReviews }) {

    const { isLoading, data: userReviews, error } = useQuery({
        queryKey: ["user-reviews", user._id],
        queryFn: async () => {
            const reviews = await getMyReviews(user._id);
            return reviews
        },
        initialData: reqUserReviews
    });

    return (
        <>
            {!userReviews ? <DataLoader /> :
                userReviews ? <section>
                    <div className={Style.reviews}>
                        {userReviews?.map((item, index) => (
                            <div key={index} className={`${Style["reviews__card"]}`}>
                                <div className={`${Style["reviews__avatar"]}`}>
                                    <div key={user._id}>
                                        <Image className={`${Style["reviews__avatar-img"]}`} src={`/img/users/${user.photo}`} alt={user.name} width={50} height={250} />
                                        <h6 className={`${Style["reviews__user"]}`}>{user.name}</h6>
                                    </div>
                                </div>
                                <h6 className={`${Style["reviews__user"]}`}>{item.tourName}</h6>
                                <p className={`${Style["reviews__text"]}`}>{item.userReview}</p>
                                <div className={`${Style["reviews__rating"]}`}>
                                    {[1, 2, 3, 4, 5].map((star, index) => (
                                        <svg key={index} className={`${Style["reviews__star"]} ${Style[`reviews__star--${item.reviewRating >= star ? "active" : "inactive"}`]}`}>
                                            <use xlinkHref="/img/icons.svg#icon-star"></use>
                                        </svg>
                                    ))}
                                </div>
                                <Link className={`${Style.btn} ${Style["btn--green"]}`} style={{ marginTop: "3rem" }} href={`/tour/${item.tourSlug}`}>Tour visit</Link>
                            </div>
                        ))}
                    </div>
                </section> : <p>No Reviews</p>}
        </>
    )
}
