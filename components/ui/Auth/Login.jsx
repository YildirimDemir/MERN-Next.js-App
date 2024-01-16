"use client";
import Style from "./login.module.css";
import Link from "next/link";
import { userLogin } from "@/services/apiUsers";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";

export default function Login() {

    const queryClient = useQueryClient();

    const { mutate, isLoading: isSigning } = useMutation({
        mutationFn: userLogin,
        onSuccess: () => {
            toast.success("Login successfully");
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            reset();

            window.location.reload();
        },
        onError: (err) => toast.error(err.message)
    });

    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    async function submitLogin(data) {
        mutate(data);
    }

    return (
        <main className={Style.main}>
            <div className={`${Style["login-form"]}`}>
                <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-lg"]}`}>Log into your account</h2>
                <form className={`${Style.form} ${Style["form--login"]}`} onSubmit={handleSubmit(submitLogin)}>
                    <div className={`${Style["form__group"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="email">Email address</label>
                        <input className={`${Style["form__input"]}`} disabled={isSigning} type="email" name="email" id="email" placeholder="you@example.com"
                            {...register("email", { required: "This field is required." })}
                        />
                        <p className={`${Style["error--text"]}`}>{errors?.email?.message}</p>
                    </div>
                    <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="password">Password</label>
                        <input className={`${Style["form__input"]}`} disabled={isSigning} type="password" name="password" id="password" placeholder="********"
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
                    <div className={`${Style["form__group"]}`}>
                        <button className={`${Style.btn} ${Style["btn--green"]}`} >Login</button>
                    </div>
                </form>
                <Link href="/forget-password">
                    <button className={`${Style.btn} ${Style["btn--green"]}`} >Forget your password?</button>
                </Link>
                <GoogleButton onClick={() => signIn("google")} style={{ marginTop: "3rem" }} />
            </div>
        </main>
    )
}
