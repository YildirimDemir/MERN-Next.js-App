"use client";
import { createLike } from "@/services/apiLikes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Style from "./all-tours.module.css";
import UnlikeButton from "./UnlikeButton";

export default function LikeButton({ tour, user, userLikes }) {

    const queryClient = useQueryClient();

    const { mutate, isLoading: isLike } = useMutation({
        mutationFn: createLike,
        onSuccess: () => {
            toast.success("This tour has been added to favorites!");
            queryClient.invalidateQueries({
                queryKey: ["tours"]
            });
            queryClient.invalidateQueries({
                queryKey: ["get-my-likes"]
            });
        },
        onError: (err) => toast.error(err.message),
    });

    function handleLike() {
        mutate({ like: true, tour });
    }

    const likedTour = userLikes?.length > 0 && userLikes?.find(item => item._id === tour._id);

    return (
        <>
            {likedTour?._id === tour._id ? <UnlikeButton tour={tour} user={user} /> :
                <button className={`${Style.btn} ${Style["btn--green"]}`} onClick={handleLike}
                    style={{ backgroundColor: "skyblue", color: "black", marginLeft: "2rem", border: "none", padding: "1rem", borderRadius: "30px 30px 30px 30px" }}>
                    Like
                </button>}
        </>
    )
}
