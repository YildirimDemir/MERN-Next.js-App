"use client";
import { ResetTokenPassword } from '@/services/apiUsers';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Style from "./login.module.css";

export default function ResetPassword({ token }) {

    const router = useRouter();

    const { mutate, isLoading: isSending } = useMutation({
        mutationFn: ResetTokenPassword,
        onSuccess: () => {
            toast.success("Password changed successfully");
            reset();
            const timeoutId = setTimeout(() => {
                router.replace("/login");
            }, 2000);

            return () => clearTimeout(timeoutId);
        },
        onError: (err) => toast.error(err.message)
    });

    const { register, handleSubmit, reset, formState, getValues } = useForm();
    const { errors } = formState;

    async function submitResetPassword(data) {
        mutate({ ...data, token });
    }

    return (
        <main className={Style.main}>
            <div className={`${Style["login-form"]}`}>
                <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-lg"]}`}>Reset Password</h2>
                <form className={`${Style.form} ${Style["form--login"]}`} onSubmit={handleSubmit(submitResetPassword)}>

                    <div className={`${Style["form__group"]} ${Style["ma-bt-md"]}`}>
                        <label className={`${Style["form__label"]}`} htmlFor="password">Password</label>
                        <input className={`${Style["form__input"]}`} type="password" name="password" id="password" placeholder="********"
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
                        <label className={`${Style["form__label"]}`} htmlFor="passwordConfirm">Confirm Password</label>
                        <input className={`${Style["form__input"]}`} type="password" name="passwordConfirm" id="passwordConfirm" placeholder="********"
                            {...register("passwordConfirm", {
                                required: "This field is required.",
                                min: {
                                    value: 8,
                                    message: "Capacity should be at least 8"
                                },
                                validate: (value) => value === getValues().password || "Passwords are not same!"
                            })}
                        />
                        <p className={`${Style["error--text"]}`}>{errors?.password?.message}</p>
                    </div>

                    <div className={`${Style["form__group"]}`}>
                        <button className={`${Style.btn} ${Style["btn--green"]}`} >Send</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
