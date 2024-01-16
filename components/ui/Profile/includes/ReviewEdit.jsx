"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Style from "../user-detail.module.css";

export default function ReviewEdit({ setEdit, selectedReview }) {

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    return (
        <div style={{ width: "75%", height: "55rem", position: "absolute", zIndex: "9999", backdropFilter: "blur(50px)" }}>
            <div style={{ display: "flex", alignItems: "center", margin: "2rem" }}>
                <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={() => setEdit((edit) => !edit)}>BACK</button>
            </div>
            <div className={`${Style["user-view__form-container"]}`}>
                <form className={`${Style.form} ${Style["form-user-data"]}`}>
                    <div className={`${Style["form__group"]} ${Style["form__photo-upload"]}`}>
                        <Image className={`${Style["form__user-photo"]}`} src={`/img/users/${selectedReview.user.photo}`} alt={`User photo`} priority width={500} height={500} />
                    </div>
                    <div className={`${Style["form__group"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="name">{selectedReview.user.name}</label>
                    </div>
                    <div className={`${Style["form__group"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="name">Tour | {selectedReview.tour.name}</label>
                    </div>
                    <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="email">Review</label>
                        <input className={`${Style["form__input"]}`} type="email" name="email" id="email" defaultValue={selectedReview.review}
                            {...register("email", { required: "This field is required." })} />
                    </div>
                    <div className={`${Style["form__group"]} ${Style.right}`}>
                        <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`}>Save settings</button>
                    </div>
                    <div className={`${Style["form__group"]} ${Style.right}`}>
                        <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
