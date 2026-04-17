import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginClient from "./loginclient";

export default async function LoginPage() {
    const session = await getServerSession();

    if (session) {
        redirect("/dashboard");
    }

    return <LoginClient />;
}