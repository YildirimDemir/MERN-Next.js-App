"use client";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "@/services/apiTours";
import { useSelector } from 'react-redux';
import { getFilteredTourData, getSearchedTourData } from "@/global/tourSlice";
import { getMyLikes } from "@/services/apiLikes";
import CardHeader from "./includes/CardHeader";
import CardDetails from "./includes/CardDetails";
import CardFooter from "./includes/CardFooter";
import Style from "./all-tours.module.css";

export default function Tours({ tours, reqUser, reqUserLikes }) {

    const searchedTour = useSelector(getSearchedTourData);
    const filteredTour = useSelector(getFilteredTourData);

    const { isLoading, data, error } = useQuery({
        queryKey: ["tours"],
        queryFn: getTours,
        initialData: tours
    });

    let content = searchedTour;
    if (searchedTour === null || searchedTour?.length === 9) content = filteredTour;

    let updateReqUserLikes;
    if (reqUser) {
        const { data: userLikes } = useQuery({
            queryKey: ["get-my-likes", reqUser?.id],
            queryFn: async () => {
                const likes = await getMyLikes(reqUser?.id);
                return likes
            },
            initialData: reqUserLikes
        });
        updateReqUserLikes = userLikes;
    }

    return (
        <>
            {content ? content?.map((tour) => (
                <div key={tour.slug} className={Style.card}>
                    <CardHeader tour={tour} />
                    <CardDetails tour={tour} user={reqUser} userLikes={updateReqUserLikes} />
                    <CardFooter tour={tour} />
                </div>
            )) :
                data?.map((tour) => (
                    <div key={tour.slug} className={Style.card}>
                        <CardHeader tour={tour} />
                        <CardDetails tour={tour} user={reqUser} userLikes={updateReqUserLikes} />
                        <CardFooter tour={tour} />
                    </div>
                ))}
        </>
    )
}
