import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { role, id } = session.user;

        let tickets;

        if (role === "ADMIN") {
            tickets = await prisma.ticket.findMany({
                include: {
                    customer: true,
                    agent: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        }

        else if (role === "AGENT") {
            tickets = await prisma.ticket.findMany({
                where: {
                    agentId: id,
                },
                include: {
                    customer: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        }

        else {
            tickets = await prisma.ticket.findMany({
                where: {
                    customerId: id,
                },
                include: {
                    agent: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        }

        return NextResponse.json(tickets, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        const error = validateTicket(body);
        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const ticket = await prisma.ticket.create({
            data: {
                title: body.title,
                description: body.description,
                priority: body.priority || "MEDIUM",

                customer: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

        return NextResponse.json(ticket, { status: 201 });
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

function validateTicket(data: any) {
    if (!data.title || typeof data.title !== "string" || data.title.length < 5) {
        return "Title must be at least 5 characters";
    }

    if (
        !data.description ||
        typeof data.description !== "string" ||
        data.description.length < 10
    ) {
        return "Description must be at least 10 characters";
    }

    if (
        data.priority &&
        !["LOW", "MEDIUM", "HIGH", "URGENT"].includes(data.priority)
    ) {
        return "Invalid priority value";
    }

    return null;
}