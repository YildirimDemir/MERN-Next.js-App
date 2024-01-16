"use client";
import { useQuery } from "@tanstack/react-query";
import { getTour } from "@/services/apiTours";
import TourHeader from "./includes/TourHeader";
import TourCTA from "./includes/TourCTA";
import TourDescription from "./includes/TourDescription";
import TourMap from "./includes/TourMap";
import TourPictures from "./includes/TourPictures";
import TourReviews from "./includes/TourReviews";

export default function TourDetail({ selectedTour, slug, reqUser }) {

    const { isLoading, data: tour, error } = useQuery({
        queryKey: ["tour", slug],
        queryFn: async () => {
            const data = await getTour(slug);
            return data;
        },
        initialData: selectedTour
    });

    if (error) throw new Error(error.message);

    return (
        <>
            <TourHeader tour={tour} />
            <TourDescription tour={tour} />
            <TourPictures tour={tour} />
            <TourMap tour={tour} />
            <TourReviews tour={tour} reqUser={reqUser} />
            <TourCTA tour={tour} reqUser={reqUser} />
        </>
    )
}
