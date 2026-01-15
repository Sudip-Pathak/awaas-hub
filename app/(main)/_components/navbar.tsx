import { useSession } from "@/lib/auth-client"
import { Session } from "@/lib/auth"
import { NavUser } from "./nav-user"


export default function DashboardNavbar() {
    const { data: session, isPending } = useSession()

    if (isPending) {
        return (
            <div className="h-14 border-b flex items-center justify-end px-4">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            </div>
        )
    }

    const user = session?.user as Session["user"] | undefined

    // Transform user data to match NavUser's expected format
    const navUserData = user ? {
        name: user.name ?? "User",
        email: user.email ?? "",
        avatar: user.image ?? ""
    } : {
        name: "User",
        email: "",
        avatar: ""
    }

    return (
        <header className="h-14 border-b bg-background flex items-center justify-end px-4">
            <NavUser user={navUserData} />

        </header>
    )
}