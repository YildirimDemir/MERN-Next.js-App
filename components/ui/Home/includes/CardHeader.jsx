"use client";
import Image from "next/image";
import Style from "../all-tours.module.css";

export default function CardHeader({ tour }) {

    return (
        <>
            <div className={`${Style["card__header"]}`}>
                <button className={`${Style["card__picture"]}`}>
                    <div className={`${Style["card__picture-overlay"]}`}>&nbsp;</div>
                    <Image className={`${Style["card__picture-img"]}`} src={`/img/tours/${tour.imageCover}`} alt={tour.name} width={300} height={350} />
                </button>
                <h3 className={`${Style["heading-tertirary"]}`}>
                    <span>{tour.name}</span>
                </h3>
            </div>
        </>
    )
}
