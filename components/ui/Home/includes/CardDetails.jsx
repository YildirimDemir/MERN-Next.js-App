"use client";
import LikeButton from "../LikeButton";
import { addItem, decreaseItemQuantity, getBasket, increaseItemQuantity, updateBasket } from "@/global/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import Style from "../all-tours.module.css";
import { addMyBasket } from "@/services/apiUsers";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function CardDetails({ tour, user, userLikes }) {

    const [updateDBBasket, setUpdateDBBasket] = useState(true);

    const { mutate, isLoading: isAdding } = useMutation({
        mutationFn: addMyBasket,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (updateDBBasket && user?.basket?.length > 0) {
            dispatch(updateBasket(user?.basket));
        }
        setUpdateDBBasket(false);
    }, []);

    const basket = useSelector(getBasket);

    const isBasket = basket?.find(item => item._id === tour._id);

    function addBasket() {
        const tourItem = { ...tour, quantity: 1, unitPrice: tour.price, totalPrice: tour.price };
        dispatch(addItem(tourItem));
    }

    function increaseItem() {
        dispatch(increaseItemQuantity(tour._id));
    }

    function decreaseItem() {
        dispatch(decreaseItemQuantity(tour._id));
    }

    useEffect(() => {
        mutate({ basket, user });
    }, [basket]);

    return (
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
                {user ? <LikeButton tour={tour} user={user} userLikes={userLikes} /> : <p style={{ color: "red", marginLeft: "1.5rem" }}>Sign in to like!</p>}
            </div>
            <div className={`${Style["card__data"]}`}>
                {isBasket ?
                    <>
                        <button style={{ fontSize: "25px", width: "10%" }} onClick={increaseItem}>+</button>
                        <button style={{ fontSize: "25px", width: "10%" }} onClick={decreaseItem}>-</button>
                    </>
                    :
                    <button className={`${Style.btn} ${Style["btn--green"]}`} onClick={addBasket}>Add basket</button>
                }
            </div>
        </div>
    )
}
