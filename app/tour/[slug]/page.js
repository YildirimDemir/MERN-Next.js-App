import Loading from "@/app/loading";
import TourDetail from "@/components/ui/Detail/TourDetail";
import { getTour } from "@/services/apiTours";
import { requestUser } from "@/services/apiUsers";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export async function generateMetadata({ params }) {

    const tour = await getTour(params.slug);

    if (!tour) throw new Error("Failed to fetch tour by slug in metadata");

    return {
        title: `Natours | ${tour?.name} Tour`,
        description: tour?.summary
    };
}

export default async function TourDetailPage({ params }) {

    const slug = params.slug;

    const tour = await getTour(slug);

    const session = await getServerSession();

    let reqUser;
    if (session) {
        reqUser = await requestUser(session?.user?.email);
    }

    return (
        <Suspense fallback={<Loading />}>
            <TourDetail selectedTour={tour} slug={slug} reqUser={reqUser} />
        </Suspense>
    )
}
