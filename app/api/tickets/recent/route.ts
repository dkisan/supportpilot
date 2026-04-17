import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const [tickets, total, open, inProgress, resolved] = await Promise.all([
            prisma.ticket.findMany({
                take: 10,
                orderBy: { createdAt: "desc" },
                include: { customer: true },
            }),

            prisma.ticket.count(),
            prisma.ticket.count({ where: { status: "OPEN" } }),
            prisma.ticket.count({ where: { status: "IN_PROGRESS" } }),
            prisma.ticket.count({ where: { status: "RESOLVED" } }),
        ]);

        return NextResponse.json({
            tickets,
            stats: {
                total,
                open,
                inProgress,
                resolved,
            },
        });
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}