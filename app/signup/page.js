import Signup from "@/components/ui/Auth/Signup";
import { Suspense } from "react";
import Loading from "../loading";

export default function SignupPage() {

    return (
        <Suspense fallback={<Loading />}>
            <Signup />
        </Suspense>
    )
}
