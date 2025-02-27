import { NextRequest, NextResponse } from "next/server";
import Redis from 'ioredis';

export async function POST(req: NextRequest) {
    const { userid } = await req.json();
    const redis = new Redis(process.env.REDIS_URL!);

    if(!userid) return NextResponse.json({ error: "Userid not found." }, { status: 400 });

    try {
        await redis.del(userid);
        return NextResponse.json({ msg: "Refresh redis success" }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}