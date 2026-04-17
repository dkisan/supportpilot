"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/tickets");
            const data = await res.json();
            setTickets(data);
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
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <h2 className="text-xl font-semibold mb-4"> Tickets </h2>

            <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-300">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Issue</th>
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
                                    onClick={() => router.push(`/dashboard/tickets/${t.id}`)}
                                    className="cursor-pointer border-t border-white/10 hover:bg-white/5"
                                >
                                    <td className="p-3 text-indigo-400">
                                        {t.id.slice(0, 8)}
                                    </td>

                                    <td className="p-3">{t.title}</td>

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
    );
}