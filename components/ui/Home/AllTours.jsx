import { getMyLikes } from "@/services/apiLikes";
import { getTours } from "@/services/apiTours";
import { requestUser } from "@/services/apiUsers";
import { getServerSession } from "next-auth";
import DataLoader from "../Loader/DataLoader";
import Style from "./all-tours.module.css";
import Filtered from "./Filtered";
import Tours from "./Tours";

export default async function AllTours() {

    const session = await getServerSession();

    let reqUser;
    if (session) {
        reqUser = await requestUser(session?.user?.email);
    }

    const tours = await getTours();

    let reqUserLikes;
    if (reqUser) {
        reqUserLikes = await getMyLikes(reqUser.id);
    }

    return (
        <main className={Style.main}>
            {!tours ? <DataLoader /> :
                <>
                    <Filtered />
                    <div className={`${Style["card-container"]}`}>
                        <Tours
                            tours={tours}
                            reqUser={reqUser}
                            reqUserLikes={reqUserLikes} />
                    </div>
                </>}
        </main>
    )
}
