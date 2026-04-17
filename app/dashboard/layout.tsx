"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
    Home,
    Ticket,
    Plus,
    PanelLeftClose,
    PanelLeftOpen,
    LogOut,
    Shield,
} from "lucide-react";
import { signOut } from "next-auth/react";
import CreateTicketModal from "@/components/tickets/createticketmodal";

const baseSidebarItems = [
    { label: "Overview", icon: Home, href: "/dashboard" },
    { label: "Tickets", icon: Ticket, href: "/dashboard/tickets" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const [collapsed, setCollapsed] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const isTicketDetail =
        pathname?.startsWith("/dashboard/tickets/") &&
        pathname !== "/dashboard/tickets";

    const sidebarItems = [
        ...baseSidebarItems,
        ...(isTicketDetail
            ? [
                  {
                      label: "Details",
                      icon: Ticket,
                      href: pathname,
                  },
              ]
            : []),
    ];

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!session) {
        router.replace("/login");
        return null;
    }

    return (
        <div className="min-h-screen flex bg-slate-950 text-white">

            <aside
                className={`${
                    collapsed ? "w-20" : "w-64"
                } transition-all duration-300 hidden md:flex flex-col border-r border-white/10 bg-white/5`}
            >
                <div className="p-4 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-indigo-400" />
                        {!collapsed && (
                            <div className="font-bold">SupportPilot</div>
                        )}
                    </div>

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 hover:bg-white/10 rounded"
                    >
                        {collapsed ? (
                            <PanelLeftOpen className="w-4 h-4" />
                        ) : (
                            <PanelLeftClose className="w-4 h-4" />
                        )}
                    </button>
                </div>

                <nav className="flex-1 p-2 space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;

                        const active =
                            pathname === item.href ||
                            (item.href !== "/dashboard" &&
                                pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                                    active
                                        ? "bg-indigo-600 text-white"
                                        : "hover:bg-white/10 text-gray-300"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {!collapsed && item.label}
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => setOpenModal(true)}
                        className="w-full mt-3 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        {!collapsed && "Create Ticket"}
                    </button>

                </nav>
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() =>
                            signOut({ callbackUrl: "/login" })
                        }
                        className="flex items-center gap-2 text-red-400"
                        >
                        <LogOut className="w-4 h-4" />
                        {!collapsed && "Logout"}
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6">{children}</main>

            <CreateTicketModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </div>
    );
}