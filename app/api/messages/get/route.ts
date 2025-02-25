import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { message } = await req.json();

    try {
        return NextResponse.json({ msg: "Unsubscribe success.", content: message }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}