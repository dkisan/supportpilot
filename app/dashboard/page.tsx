"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import {
    Home,
    Ticket,
    BarChart3,
    Users,
    Settings,
    Plus,
    Menu,
    PanelLeftClose,
    PanelLeftOpen,
    LogOut,
    Shield
} from "lucide-react";

const sidebarItems = [
    { label: "Overview", icon: Home, href: "/dashboard" },
    { label: "Tickets", icon: Ticket, href: "/dashboard/tickets" },
];

const mockTickets = [
    {
        id: "TCK-1001",
        title: "Payment failed during checkout",
        status: "Open",
        priority: "High",
        category: "Payment",
        customer: "rahul@gmail.com",
    },
    {
        id: "TCK-1002",
        title: "Unable to login with correct password",
        status: "In Progress",
        priority: "Medium",
        category: "Login",
        customer: "neha@gmail.com",
    },
    {
        id: "TCK-1003",
        title: "Refund not received",
        status: "Resolved",
        priority: "High",
        category: "Refund",
        customer: "amit@gmail.com",
    },
];

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!session) {
        router.push("/login");
        return null;
    }

    return (
        <div className="min-h-screen flex bg-slate-950 text-white">
            <aside
                className={`${collapsed ? "w-20" : "w-64"} transition-all duration-300 hidden md:flex flex-col border-r border-white/10 bg-white/5`}
            >
                <div className="p-4 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-indigo-400" />
                        {!collapsed && (
                            <div className="text-lg font-bold tracking-wide">
                                SupportPilot
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded hover:bg-white/10 transition"
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? (
                            <PanelLeftOpen className="w-4 h-4" />
                        ) : (
                            <PanelLeftClose className="w-4 h-4" />
                        )}
                    </button>
                </div>

                <nav className="flex-1 p-2 space-y-1">
                    {sidebarItems.map((item, idx) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={idx}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm font-medium ${isActive
                                        ? "bg-indigo-600 text-white"
                                        : "hover:bg-white/10 text-gray-300"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}

                    <div className="p-3">
                        <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition px-3 py-2 rounded-lg">
                            <Plus className="w-4 h-4" />
                            {!collapsed && "Create Ticket"}
                        </button>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10 flex items-center justify-center">
                    {!collapsed ? (
                        <LogoutButton />
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer">
                                <LogOut onClick={() => signOut({ callbackUrl: "/login" })} className="w-5 h-5 text-red-400" />
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            <main className="flex-1 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Support Dashboard</h1>
                        <p className="text-gray-400 mt-1">
                            Welcome back, {session.user?.name}
                        </p>
                    </div>

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="md:hidden p-2 bg-white/10 rounded-lg"
                        title={collapsed ? "Open menu" : "Close menu"}
                    >
                        {collapsed ? (
                            <Menu className="w-5 h-5" />
                        ) : (
                            <PanelLeftClose className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-gray-400">Total Tickets</p>
                        <p className="text-2xl font-bold">128</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-gray-400">Open</p>
                        <p className="text-2xl font-bold">42</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-gray-400">In Progress</p>
                        <p className="text-2xl font-bold">18</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-gray-400">Resolved</p>
                        <p className="text-2xl font-bold">68</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Recent Tickets</h2>

                    <div className="rounded-xl border border-white/10 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-300">
                                <tr>
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Issue</th>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockTickets.map((t) => (
                                    <tr key={t.id} className="border-t border-white/10 hover:bg-white/5">
                                        <td className="p-3 text-indigo-400">{t.id}</td>
                                        <td className="p-3">{t.title}</td>
                                        <td className="p-3 text-gray-300">{t.customer}</td>
                                        <td className="p-3">
                                            <span className="px-2 py-1 rounded bg-white/10 text-sm">
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="p-3">{t.priority}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
