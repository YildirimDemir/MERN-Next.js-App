"use client";
import { useForm } from "react-hook-form";
import Style from "../user-detail.module.css";

export default function TourEdit({ setEdit, selectedTour }) {

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    return (
        <div style={{ width: "75%", height: "55rem", position: "absolute", zIndex: "9999", backdropFilter: "blur(50px)" }}>
            <div style={{ display: "flex", alignItems: "center", margin: "2rem" }}>
                <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={() => setEdit((edit) => !edit)}>BACK</button>
            </div>
            <div className={`${Style["user-view__form-container"]}`}>
                <form className={`${Style.form} ${Style["form-user-data"]}`}>
                    <div className={`${Style["form__group"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="name">Name</label>
                        <input className={`${Style["form__input"]}`} type="text" name="name" id="name" defaultValue={selectedTour.name}
                            {...register("name", { required: "This field is required." })}
                        />
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
