"use client";
import { getBookings } from "@/services/apiAdmin";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Style from "../../Home/all-tours.module.css";
import DataLoader from "../../Loader/DataLoader";

export default function AdminBookings() {

    const { isLoading, data: bookings, error } = useQuery({
        queryKey: ["manage-bookings"],
        queryFn: getBookings,
    });

    return (
        <>
            {!bookings ? <DataLoader /> :
                <div className={`${Style["card-container"]}`}>
                    {bookings?.map((booking, index) => (
                        <div key={index} className={Style.card} style={{ display: "flex", margin: "2rem", alignItems: "center", width: "100%" }}>
                            <Image className={`${Style["form__user-photo"]}`} src={`/img/users/${booking.user.photo}`} alt={`User photo`} priority width={150} height={150} />
                            <h1 >{booking.user.name}</h1>
                            <h1 >{booking.tour.name}</h1>
                            <div className={`${Style["form__group"]} ${Style.right}`} style={{ justifyContent: "center", alignItems: "center", margin: "0", padding: "1rem" }}>
                                <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>}
        </>
    )
}
