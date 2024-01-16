"use client";
import { getReviews } from "@/services/apiAdmin";
import { paginationReviews } from "@/services/apiReviews";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Style from "../../Detail/tour-detail.module.css";
import DataLoader from "../../Loader/DataLoader";
import ReviewEdit from "./ReviewEdit";

export default function AdminReviews() {

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedReview, setSelectedReview] = useState({});

    const { mutate, data: paginationData } = useMutation({
        mutationFn: paginationReviews,
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
        setSelectedReview(data)
        setIsEdit((edit) => !edit);
    }

    return (
        <>
            {isEdit ?
                <ReviewEdit setEdit={setIsEdit} selectedReview={selectedReview} />
                :
                <div>
                    <div style={{ display: "flex", alignItems: "center", margin: "3rem" }}>
                        <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={prevPage} disabled={page <= 1}>BACK</button>
                        <h1 style={{ marginRight: "2rem" }}>{page}/{totalPages}</h1>
                        <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={nextPage} disabled={page >= paginationData?.totalPageNumber}>NEXT</button>
                    </div>
                    {paginationData === undefined ? <DataLoader /> :
                        <section style={{ display: "flex", padding: "2rem" }}>
                            {paginationData?.reviews?.map((review, index) => (
                                <div key={index} style={{ width: "50%", padding: "3rem" }}>
                                    <div className={`${Style["reviews__avatar"]}`}>
                                        <div>
                                            <Image className={`${Style["reviews__avatar-img"]}`} src={`/img/users/${review.user.photo}`} alt={review.user.name} width={50} height={250} />
                                            <h6 className={`${Style["reviews__user"]}`}>{review.user.name}</h6>
                                        </div>
                                    </div>
                                    <h6 className={`${Style["reviews__user"]}`}>{review.tour.name}</h6>
                                    <p className={`${Style["reviews__text"]}`}>{review.review}</p>
                                    <div className={`${Style["reviews__rating"]}`}>
                                        {[1, 2, 3, 4, 5].map((star, index) => (
                                            <svg key={index} className={`${Style["reviews__star"]} ${Style[`reviews__star--${review.rating >= star ? "active" : "inactive"}`]}`}>
                                                <use xlinkHref="/img/icons.svg#icon-star"></use>
                                            </svg>
                                        ))}
                                    </div>
                                    <button className={`${Style.btn} ${Style["btn--green"]}`} style={{ marginTop: "3rem" }} onClick={() => handleEdit(review)}>Edit</button>
                                </div>
                            ))}
                        </section>}
                </div>}
        </>
    )
}
