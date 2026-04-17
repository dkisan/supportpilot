"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function TicketDetail() {
    const { id } = useParams();
    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        fetch(`/api/tickets/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTicket(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="p-6 text-gray-400 animate-pulse">
                Loading ticket details...
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="p-6 text-red-400">
                Ticket not found
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">
                            {ticket.title}
                        </h1>

                        <p className="text-gray-400 text-sm mt-1">
                            Ticket ID: {ticket.id.slice(0, 10)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                        <p className="text-gray-400 text-xs">Status</p>
                        <p className="text-white font-medium mt-1">
                            {ticket.status}
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                        <p className="text-gray-400 text-xs">Priority</p>
                        <p className="text-white font-medium mt-1">
                            {ticket.priority}
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                        <p className="text-gray-400 text-xs">Created</p>
                        <p className="text-white font-medium mt-1">
                            {new Date(ticket.createdAt).toLocaleString()}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <p className="text-gray-400 text-xs">Customer</p>
                    <p className="text-white font-medium mt-1">
                        {ticket.customer?.email || "Unknown"}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 p-5 rounded-xl bg-black/30 border border-white/10"
                >
                    <p className="text-gray-400 text-xs mb-2">Description</p>
                    <p className="text-gray-200 leading-relaxed">
                        {ticket.description}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}