import { NextRequest, NextResponse } from "next/server";

import { extractUTCDate, fetchHDChart, fetchHDTransit, fetchVedicChart, fetchVedicTransit} from '../../../../lib/utils'

export async function POST(req: NextRequest) {
    const { message } = await req.json();

    const birthdate = extractUTCDate(message);

    if(!birthdate) return NextResponse.json({ error: "Invalid or missing birthdate." }, { status: 400 });

    try {
        const utcDate = new Date(birthdate).toUTCString();
        const HDChart = await fetchHDChart(utcDate);
        const VedicChart = await fetchVedicChart(birthdate);

        return NextResponse.json({ msg: "Unsubscribe success.", content: birthdate }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}