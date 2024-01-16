"use client";
import { createReview } from "@/services/apiReviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Style from "../tour-detail.module.css";

export default function TourAddReviewForm({ reqUser, tour }) {

    const queryClient = useQueryClient();

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            toast.success("New Review successfully created");
            queryClient.invalidateQueries({
                queryKey: ["reviews"]
            });
            reset();

            window.location.reload();
        },
        onError: (err) => toast.error(err.message),
    });

    const { register, handleSubmit, reset, getValues, formState, control } = useForm();
    const { errors } = formState;

    async function submitAddComment(data) {
        mutate({ ...data, tourID: tour._id, userID: reqUser._id });
    }

    return (
        <>
            {reqUser &&
                <div className={`${Style["comment-form"]}`} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-lg"]}`} style={{ color: "black" }}>Comment on your journey!</h2>
                    <form className={`${Style.form} ${Style["form--comment"]}`} onSubmit={handleSubmit(submitAddComment)}>
                        <div className={`${Style["form__group"]}`}>
                            <div className={`${Style["reviews__avatar"]}`}>
                                <Image className={`${Style["reviews__avatar-img"]}`} src={`/img/users/${reqUser.photo}`} alt={reqUser.name} width={50} height={250} />
                                <h6 className={`${Style["reviews__user"]}`}>{reqUser.name}</h6>
                            </div>
                        </div>

                        <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`}>
                            <label className={`${Style["form__label"]}`} style={{ color: "black" }} htmlFor="rating">Rating</label>
                            <Controller
                                name="rating"
                                control={control}
                                defaultValue="1"
                                render={({ field }) => (
                                    <select {...field} style={{ fontSize: "20px" }}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                )}
                            />
                        </div>

                        <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`} style={{ marginTop: "2rem" }}>
                            <label className={`${Style["form__label"]}`} style={{ color: "black" }} htmlFor="comment">Comment</label>
                            <input className={`${Style["form__input"]}`} style={{ borderTop: "2px solid black", borderLeft: "2px solid black", borderRight: "2px solid black" }} type="text" id="comment" placeholder="Write something..."
                                {...register("comment", { required: "This field is required." })}
                            />
                        </div>

                        <div className={`${Style["form__group"]}`}>
                            <button className={`${Style.btn} ${Style["btn--green"]}`} style={{ backgroundColor: "black", marginTop: "2rem" }}>Submit</button>
                        </div>
                    </form>
                </div>}
        </>
    )
}
