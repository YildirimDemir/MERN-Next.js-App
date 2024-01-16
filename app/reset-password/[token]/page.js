import ResetPassword from "@/components/ui/Auth/ResetPassword";

export default function ResetPasswordPage({ params }) {

    return (
        <ResetPassword token={params.token} />
    )
}
