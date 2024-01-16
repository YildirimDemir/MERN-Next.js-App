import Image from 'next/image';
import Style from "../tour-detail.module.css";
import TourAddReviewForm from './TourAddReviewForm';

export default function TourReviews({ tour, reqUser }) {

    return (
        <section className={`${Style["section-reviews"]}`}>
            <TourAddReviewForm tour={tour} reqUser={reqUser} />
            <div className={Style.reviews}>
                {tour?.reviews?.map((review, index) => (
                    <div key={index} className={`${Style["reviews__card"]}`}>
                        <div className={`${Style["reviews__avatar"]}`}>
                            <div>
                                <Image className={`${Style["reviews__avatar-img"]}`} src={`/img/users/${review.user.photo}`} alt={review.user.name} width={50} height={250} />
                                <h6 className={`${Style["reviews__user"]}`}>{review.user.name}</h6>
                            </div>
                        </div>
                        <p className={`${Style["reviews__text"]}`}>{review.review}</p>
                        <div className={`${Style["reviews__rating"]}`}>
                            {[1, 2, 3, 4, 5].map((star, index) => (
                                <svg key={index} className={`${Style["reviews__star"]} ${Style[`reviews__star--${review.rating >= star ? "active" : "inactive"}`]}`}>
                                    <use xlinkHref="/img/icons.svg#icon-star"></use>
                                </svg>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
