import { getMyBookings } from "@/services/apiBookings";
import { getMyLikes } from "@/services/apiLikes";
import { getMyReviews } from "@/services/apiReviews";
import { requestUser } from "@/services/apiUsers";
import { getServerSession } from "next-auth";
import DetailContainer from "./includes/DetailContainer";
import Style from "./user-detail.module.css";

export default async function UserDetailMain() {

    const session = await getServerSession();

    const reqUser = await requestUser(session?.user?.email);

    const reqUserBookings = await getMyBookings(reqUser._id);

    const reqUserReviews = await getMyReviews(reqUser._id);

    const reqUserLikes = await getMyLikes(reqUser._id);

    return (
        <main className={Style.main}>
            <DetailContainer
                reqUser={reqUser}
                reqUserBookings={reqUserBookings}
                reqUserReviews={reqUserReviews}
                reqUserLikes={reqUserLikes} />
        </main>
    )
}
