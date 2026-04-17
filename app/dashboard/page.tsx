"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Menu,
    PanelLeftClose,
} from "lucide-react";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [collapsed, setCollapsed] = useState(false);

    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        inProgress: 0,
        resolved: 0,
    });

    const fetchTickets = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/tickets/recent");
            const data = await res.json();

            setTickets(data.tickets || []);
            setStats(
                data.stats || {
                    total: 0,
                    open: 0,
                    inProgress: 0,
                    resolved: 0,
                }
            );
        } catch (err) {
            console.error("Failed to fetch tickets", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

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
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">

            <main className="flex-1 p-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Support Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Welcome back, {session.user?.name}
                        </p>
                    </div>

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="md:hidden p-2 bg-white/10 rounded-lg"
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
                        <p className="text-gray-400">Total</p>
                        <p className="text-2xl font-bold">{stats.total}</p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-gray-400">Open</p>
                        <p className="text-2xl font-bold">{stats.open}</p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-gray-400">In Progress</p>
                        <p className="text-2xl font-bold">{stats.inProgress}</p>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-gray-400">Resolved</p>
                        <p className="text-2xl font-bold">{stats.resolved}</p>
                    </div>

                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Recent Tickets
                    </h2>

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
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="p-6 text-center text-gray-400">
                                            Loading tickets...
                                        </td>
                                    </tr>
                                ) : tickets.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-6 text-center text-gray-400">
                                            No tickets found
                                        </td>
                                    </tr>
                                ) : (
                                    tickets.map((t) => (
                                        <tr
                                            key={t.id}
                                            onClick={() =>
                                                router.push(`/dashboard/tickets/${t.id}`)
                                            }
                                            className="cursor-pointer border-t border-white/10 hover:bg-white/5"
                                        >
                                            <td className="p-3 text-indigo-400">
                                                {t.id.slice(0, 8)}
                                            </td>

                                            <td className="p-3">{t.title}</td>

                                            <td className="p-3 text-gray-300">
                                                {t.customer?.email || t.customer?.name || "N/A"}
                                            </td>

                                            <td className="p-3">
                                                <span className="px-2 py-1 rounded bg-white/10 text-sm">
                                                    {t.status}
                                                </span>
                                            </td>

                                            <td className="p-3">
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-medium
                                                        ${t.priority === "LOW"
                                                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                            : t.priority === "MEDIUM"
                                                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                                                : t.priority === "HIGH"
                                                                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                                                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                                                        }`}
                                                >
                                                    {t.priority}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}