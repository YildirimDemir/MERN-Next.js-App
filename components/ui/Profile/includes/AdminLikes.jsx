"use client";
import { getLikes } from "@/services/apiLikes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Style from "../../Home/all-tours.module.css";
import DataLoader from "../../Loader/DataLoader";

export default function AdminLikes() {

    const { isLoading, data: likes, error } = useQuery({
        queryKey: ["manage-likes"],
        queryFn: getLikes,
    });

    return (
        <>
            {!likes ? <DataLoader /> :
                <div className={`${Style["card-container"]}`}>
                    {likes?.map((like, index) => (
                        <div key={index} className={Style.card} style={{ display: "flex", margin: "2rem", alignItems: "center", width: "100%" }}>
                            <Image className={`${Style["form__user-photo"]}`} src={`/img/users/${like.user.photo}`} alt={`User photo`} priority width={150} height={150} />
                            <h1 >{like.user.name}</h1>
                            <h1 >{like.tour.name}</h1>
                            <div className={`${Style["form__group"]} ${Style.right}`} style={{ justifyContent: "center", alignItems: "center", margin: "0", padding: "1rem" }}>
                                <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>}
        </>

    )
}
