import Login from "@/components/ui/Auth/Login";
import { Suspense } from "react";
import Loading from "../loading";

export default function LoginPage() {

    return (
        <Suspense fallback={<Loading />}>
            <Login />
        </Suspense>
    )
}
