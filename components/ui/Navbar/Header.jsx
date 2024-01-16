import { requestUser } from "@/services/apiUsers";
import { getServerSession } from "next-auth";
import Navbar from "./Navbar";

export default async function Header() {

    const session = await getServerSession();

    let reqUser;
    if (session) {
        reqUser = await requestUser(session?.user?.email);
    }

    return (
        <Navbar reqUser={reqUser} />
    )
}
