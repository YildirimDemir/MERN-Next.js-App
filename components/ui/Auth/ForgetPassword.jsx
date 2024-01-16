"use client";
import { forgetResetPassword } from '@/services/apiUsers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Style from "./login.module.css";

export default function ForgetPassword() {

    const queryClient = useQueryClient();

    const { mutate, isLoading: isSending } = useMutation({
        mutationFn: forgetResetPassword,
        onSuccess: () => {
            toast.success("Email was sent successfully");
            reset();
        },
        onError: (err) => toast.error(err.message)
    });

    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    async function submitSendEmail(data) {
        mutate(data);
    }

    return (
        <main className={Style.main}>
            <div className={`${Style["login-form"]}`}>
                <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-lg"]}`}>Enter your email address</h2>
                <form className={`${Style.form} ${Style["form--login"]}`} onSubmit={handleSubmit(submitSendEmail)}>

                    <div className={`${Style["form__group"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="email">Email address</label>
                        <input className={`${Style["form__input"]}`} type="email" name="email" id="email" placeholder="you@example.com"
                            {...register("email", { required: "This field is required." })}
                        />
                        <p className={`${Style["error--text"]}`}>{errors?.email?.message}</p>
                    </div>

                    <div className={`${Style["form__group"]}`}>
                        <button className={`${Style.btn} ${Style["btn--green"]}`} >Send</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
