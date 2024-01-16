"use client";
import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "@/services/apiUsers";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Style from "../user-detail.module.css";
import { useRef } from "react";

export default function FormUserData({ userID, userName, userEmail, userPhoto }) {

    const photoInputRef = useRef(null);

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: updateUserData,
        onSuccess: () => {
            toast.success("Update successfully");
            window.location.reload();
        },
        onError: (err) => toast.error(err.message),
    });

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    async function submitUserData(data) {
        const files = photoInputRef.current.files;
        mutate({ ...data, id: userID, photo: files });
    }

    return (
        <div className={`${Style["user-view__form-container"]}`}>
            <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-md"]}`}>Your account settings</h2>
            <form className={`${Style.form} ${Style["form-user-data"]}`} onSubmit={handleSubmit(submitUserData)}>
                <div className={`${Style["form__group"]}`}>
                    <label className={`${Style["form__label"]}`} htmlFor="name">Name</label>
                    <input className={`${Style["form__input"]}`} disabled={isCreating} type="text" name="name" id="name" defaultValue={userName}
                        {...register("name", { required: "This field is required." })}
                    />
                </div>
                <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`}>
                    <label className={`${Style["form__label"]}`} htmlFor="email">Email Address</label>
                    <input className={`${Style["form__input"]}`} disabled={isCreating} type="email" name="email" id="email" defaultValue={userEmail}
                        {...register("email", { required: "This field is required." })} />
                </div>
                <div className={`${Style["form__group"]} ${Style["form__photo-upload"]}`}>
                    <Image className={`${Style["form__user-photo"]}`} src={`/img/users/${userPhoto}`} alt={`User photo`} priority width={500} height={500} />
                    <input className={`${Style["form__upload"]}`} ref={photoInputRef} multiple={true} disabled={isCreating} type="file" accept="image/*" name="photo" id="photo" />
                    <label htmlFor="photo">Choose new photo</label>
                </div>
                <div className={`${Style["form__group"]} ${Style.right}`}>
                    <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`}> Save settings</button>
                </div>
            </form>
        </div>
    )
}
