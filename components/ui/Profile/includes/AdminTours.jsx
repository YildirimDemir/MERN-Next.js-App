"use client";
import { paginationTours } from "@/services/apiTours";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import Style from "../../Home/all-tours.module.css";
import DataLoader from "../../Loader/DataLoader";
import TourEdit from "./TourEdit";

export default function AdminTours() {

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTour, setSelectedTour] = useState({});

    const { mutate, data: paginationData } = useMutation({
        mutationFn: paginationTours,
        onError: (err) => Console.error(err.message),
        onSuccess: (data) => {
            setTotalPages(data.totalPageNumber);
        }
    });

    useEffect(() => {
        mutate({ page });
    }, [page]);

    const nextPage = () => {
        if (page < paginationData?.totalPageNumber) {
            setPage(page => page + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    function handleEdit(data) {
        setSelectedTour(data)
        setIsEdit((edit) => !edit);
    }

    return (
        <>{isEdit ?
            <TourEdit setEdit={setIsEdit} selectedTour={selectedTour} />
            :
            <div>
                <div style={{ display: "flex", alignItems: "center", margin: "2rem" }}>
                    <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={prevPage} disabled={page <= 1}>BACK</button>
                    <h1 style={{ marginRight: "2rem" }}>{page}/{totalPages}</h1>
                    <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={nextPage} disabled={page >= paginationData?.totalPageNumber}>NEXT</button>
                </div>
                {paginationData === undefined ? <DataLoader /> :
                    <div className={`${Style["card-container"]}`}>
                        {paginationData?.tours?.map(tour => (
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
                                    <button className={`${Style.btn} ${Style["btn--green"]}`} onClick={() => handleEdit(tour)}>
                                        Edit
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>}
            </div>}
        </>
    )
}
