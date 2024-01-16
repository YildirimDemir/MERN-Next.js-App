"use client";
import { deleteLike } from '@/services/apiLikes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import Style from "./all-tours.module.css";

export default function UnlikeButton({ tour, user }) {

    const queryClient = useQueryClient();

    const { mutate, isLoading: disLike } = useMutation({
        mutationFn: deleteLike,
        onSuccess: () => {
            toast.success("This tour deleted in favorites...");
            queryClient.invalidateQueries({
                queryKey: ["tours"]
            });
            queryClient.invalidateQueries({
                queryKey: ["get-my-likes"]
            });
        },
        onError: (err) => toast.error(err.message),
    });

    function handleDisLike() {
        mutate({ tourId: tour._id, userId: user._id });
    }

    return (
        <button className={`${Style.btn} ${Style["btn--green"]}`} onClick={handleDisLike}
            style={{ backgroundColor: "red", color: "white", marginLeft: "2rem", border: "none", padding: "1rem", borderRadius: "30px 30px 30px 30px" }}>
            Unlike
        </button>
    )
}
