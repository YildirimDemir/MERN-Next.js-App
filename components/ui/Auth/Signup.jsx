"use client";
import Style from "./signup.module.css";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userSignup } from "@/services/apiUsers";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

export default function Signup() {

    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: userSignup,
        onSuccess: () => {
            toast.success("New user successfully created");
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            reset();

            const timer = setTimeout(() => {
                router.replace("/login");
            }, 3000);

            return () => clearTimeout(timer);
        },
        onError: (err) => toast.error(err.message),
    });

    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    async function submitSignup(data) {
        mutate(data);
    }

    return (
        <main className={Style.main}>
            <div className={`${Style["login-form"]}`}>
                <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-lg"]}`}>Welcome to the club</h2>
                <form className={`${Style.form} ${Style["form--signup"]}`} onSubmit={handleSubmit(submitSignup)}>

                    <div className={`${Style["form__group"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="name">Name</label>
                        <input className={`${Style["form__input"]}`} disabled={isCreating} type="text" name="name" id="name" placeholder="name surname"
                            {...register("name", { required: "This field is required." })}
                        />
                        <p className={`${Style["error--text"]}`}>{errors?.name?.message}</p>
                    </div>

                    <div className={`${Style["form__group"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="email">Email address</label>
                        <input className={`${Style["form__input"]}`} disabled={isCreating} type="email" name="email" id="email" placeholder="you@example.com"
                            {...register("email", { required: "This field is required." })}
                        />
                        <p className={`${Style["error--text"]}`}>{errors?.email?.message}</p>
                    </div>

                    <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="password">Password</label>
                        <input className={`${Style["form__input"]}`} disabled={isCreating} type="password" name="password" id="password" placeholder="********"
                            {...register("password", {
                                required: "This field is required.",
                                min: {
                                    value: 8,
                                    message: "Capacity should be at least 8"
                                }
                            })}
                        />
                        <p className={`${Style["error--text"]}`}>{errors?.password?.message}</p>
                    </div>

                    <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="password-confirm">Confirm Password</label>
                        <input className={`${Style["form__input"]}`} disabled={isCreating} type="password" name="password-confirm" id="passwordConfirm" placeholder="********"
                            {...register("passwordConfirm", {
                                required: "This field is required.",
                                min: {
                                    value: 8,
                                    message: "Capacity should be at least 8"
                                },
                                validate: (value) => value === getValues().password || "Passwords are not same!"
                            })}
                        />
                        <p className={`${Style["error--text"]}`}>{errors?.passwordConfirm?.message}</p>
                    </div>

                    <div className={`${Style["form__group"]}`}>
                        <button className={`${Style.btn} ${Style["btn--green"]}`} >{isCreating ? "Pending..." : "Signup"}</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
