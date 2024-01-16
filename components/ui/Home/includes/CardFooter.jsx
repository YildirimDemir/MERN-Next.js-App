import Link from "next/link";
import Style from "../all-tours.module.css";

export default function CardFooter({ tour }) {

    return (
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
    )
}
