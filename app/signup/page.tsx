// app/signup/page.tsx (SERVER COMPONENT)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignupClient from "./signupclient";

export default async function SignupPage() {
    const session = await getServerSession();

    if (session) {
        redirect("/dashboard");
    }

    return <SignupClient />;
}