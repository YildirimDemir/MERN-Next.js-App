import { updateUserPassword } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Style from "../user-detail.module.css";

export default function FormUserPassword({ userID }) {

    const queryClient = useQueryClient();

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: updateUserPassword,
        onSuccess: () => {
            toast.success("Update successfully");
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });

            const timer = setTimeout(() => {
                window.location.reload();
            }, 3000);

            return () => clearTimeout(timer);
        },
        onError: (err) => toast.error(err.message),
    });

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    async function submitUserPassword(data) {
        mutate({ ...data, id: userID });
    }

    return (
        <div className={`${Style["user-view__form-container"]}`}>
            <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-md"]}`}>Password change</h2>
            <form className={`${Style.form} ${Style["form-user-password"]}`} onSubmit={handleSubmit(submitUserPassword)}>
                <div className={`${Style["form__group"]}`}>
                    <label className={`${Style["form__label"]}`} htmlFor="passwordCurrent">Current password</label>
                    <input className={`${Style["form__input"]}`} type="password" name="passwordCurrent" id="passwordCurrent" placeholder="********"
                        {...register("passwordCurrent", { required: "This field is required." })}
                    />
                </div>
                <div className={`${Style["form__group"]}`}>
                    <label className={`${Style["form__label"]}`} htmlFor="newPassword">New password</label>
                    <input className={`${Style["form__input"]}`} type="password" name="newPassword" id="newPassword"
                        {...register("newPassword", { required: "This field is required." })}
                    />
                </div>
                <div className={`${Style["form__group"]} ${Style["ma-bt-lg"]}`}>
                    <label className={`${Style["form__label"]}`} htmlFor="passwordConfirm">Confirm password</label>
                    <input className={`${Style["form__input"]}`} type="password" name="passwordConfirm" id="passwordConfirm"
                        {...register("passwordConfirm", { required: "This field is required." })}
                    />
                </div>
                <div className={`${Style["form__group"]} ${Style.right}`}>
                    <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]} ${Style["btn--save--password"]}`}> Save password</button>
                </div>
            </form>
        </div>
    )
}
