"use client";
import { useState } from "react";
import FormUserData from "./FormUserData";
import FormUserPassword from "./FormUserPassword";
import MyBookings from "./MyBookings";
import MyFavourites from "./MyFavourites";
import MyReviews from "./MyReviews";
import Sidebar from "./Sidebar";
import Style from "../user-detail.module.css";
import AdminUsers from "./AdminUsers";
import AdminTours from "./AdminTours";
import AdminReviews from "./AdminReviews";
import AdminLikes from "./AdminLikes";
import AdminBookings from "./AdminBookings";

export default function DetailContainer({ reqUser, reqUserBookings, reqUserReviews, reqUserLikes }) {

    const [selectedContent, setSelectedContent] = useState("settings");

    return (
        <>
            <Sidebar setContent={setSelectedContent} user={reqUser} />

            <div className={`${Style["user-view__content"]}`}>
                {selectedContent === "settings" &&
                    <>
                        <FormUserData userID={reqUser._id} userName={reqUser.name} userEmail={reqUser.email} userPhoto={reqUser.photo} />
                        <div className={Style.line}>
                            &nbsp;
                        </div>
                        <FormUserPassword userID={reqUser._id} />
                    </>}

                {selectedContent === "bookings" &&
                    <>
                        <MyBookings user={reqUser} reqUserBookings={reqUserBookings} />
                    </>}

                {selectedContent === "reviews" &&
                    <>
                        <MyReviews user={reqUser} reqUserReviews={reqUserReviews} />
                    </>}

                {selectedContent === "favourites" &&
                    <>
                        <MyFavourites user={reqUser} reqUserLikes={reqUserLikes} />
                    </>}

                {selectedContent === "dbusers" &&
                    <>
                        <AdminUsers />
                    </>}

                {selectedContent === "dbtours" &&
                    <>
                        <AdminTours />
                    </>}

                {selectedContent === "dbreviews" &&
                    <>
                        <AdminReviews />
                    </>}

                {selectedContent === "dblikes" &&
                    <>
                        <AdminLikes />
                    </>}

                {selectedContent === "dbbookings" &&
                    <>
                        <AdminBookings />
                    </>}
            </div>
        </>
    )
}
