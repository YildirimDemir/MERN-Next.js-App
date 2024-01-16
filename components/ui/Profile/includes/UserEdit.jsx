"use client";
import Image from "next/image";
import { deleteUser } from "@/services/apiAdmin";
import { updateUserData } from "@/services/apiUsers";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Style from "../user-detail.module.css";

export default function UserEdit({ setEdit, selectedUser }) {

    const [isDelete, setIsDelete] = useState(false);

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
        mutate({ ...data, id: selectedUser._id, photo: files });
    }

    const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("Delete successfully");
            window.location.reload();
        },
        onError: (err) => toast.error(err.message),
    });

    function handleDeleteUser() {
        deleteMutate({ id: selectedUser._id });
    }

    return (
        <>
            {isDelete && <div style={{ width: "60%", height: "55rem", position: "absolute", zIndex: "99999", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "10px 10px 10px 10px" }}>
                <div style={{ backgroundColor: "green", width: "60%", height: "20rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "10px 10px 10px 10px" }}>
                    <h1 style={{ color: "white", marginBottom: "1rem" }}>Are you sure?</h1>
                    <div style={{ width: "50%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ backgroundColor: "red", color: "white" }} onClick={handleDeleteUser}>Yes</button>
                        <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ backgroundColor: "white", color: "black" }} onClick={() => setIsDelete((state) => !state)}>Cancel</button>
                    </div>
                </div>
            </div>}

            <div style={{ width: "75%", height: "55rem", position: "absolute", zIndex: "9999", filter: isDelete && "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", margin: "2rem" }}>
                    <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={() => setEdit((edit) => !edit)}>BACK</button>
                </div>
                <div className={`${Style["user-view__form-container"]}`}>
                    <form className={`${Style.form} ${Style["form-user-data"]}`} onSubmit={handleSubmit(submitUserData)}>
                        <div className={`${Style["form__group"]} ${Style["form__photo-upload"]}`}>
                            <Image className={`${Style["form__user-photo"]}`} src={`/img/users/${selectedUser.photo}`} alt={`User photo`} priority width={500} height={500} />
                            <input className={`${Style["form__upload"]}`} ref={photoInputRef} multiple={true} type="file" accept="image/*" name="photo" id="photo" />
                            <label htmlFor="photo">Choose new photo</label>
                        </div>
                        <div className={`${Style["form__group"]}`}>
                            <label className={`${Style["form__label"]}`} htmlFor="name">Name</label>
                            <input className={`${Style["form__input"]}`} type="text" name="name" id="name" defaultValue={selectedUser.name}
                                {...register("name", { required: "This field is required." })}
                            />
                        </div>
                        <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`}>
                            <label className={`${Style["form__label"]}`} htmlFor="email">Email Address</label>
                            <input className={`${Style["form__input"]}`} type="email" name="email" id="email" defaultValue={selectedUser.email}
                                {...register("email", { required: "This field is required." })} />
                        </div>
                        <div className={`${Style["form__group"]} ${Style.right}`}>
                            <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} disabled={isDelete} >Save settings</button>
                        </div>
                    </form>
                    <div className={`${Style["form__group"]} ${Style.right}`}>
                        <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ backgroundColor: "red", color: "white" }} disabled={isDelete} onClick={() => setIsDelete((state) => !state)}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}
