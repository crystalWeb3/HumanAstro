import { NextRequest, NextResponse } from "next/server";
import Redis from 'ioredis';
import { UserType } from "@/lib/type";
import { extractDate, extractGeometry, validateDate, fetchHDChart, fetchVedicChart, extractHouses } from '../../../../lib/utils';

export async function POST(req: NextRequest) {
    const redis = new Redis(process.env.REDIS_URL!);

    try {
        const { message, userid } = await req.json();
        console.log(userid)
        const userDataString = await redis.get(userid);
        const sendResponse = (msg: string, status: number) =>
            NextResponse.json({ msg }, { status });

        if (userDataString) {
            const userData: UserType = JSON.parse(userDataString);

            if (userData.birthdate && userData.location) {
                const { birthdate, lat, lon, tz } = userData;
                const formattedBirthDate = new Date(userData.birthdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

                if(message === '') return sendResponse(`Your birthdate is ${formattedBirthDate} and Birth location ${userData.location}. Please feel free to ask any questions related to the following areas: Self, Wealth, Communication, Home, Creativity, Health, Partnership, Transformation, Luck, Career, Friendships, and Secrets.`, 201);
                
                const houses = extractHouses(message);
                if(houses.length === 0) return sendResponse(`I apologize, but I am unable to respond to questions that are outside the scope of the topic.`, 201); 
                let responseArr :string[] = [];

                if(!userData.hdchart || !userData.astrologychart) {
                    const hdchart = await fetchHDChart(birthdate);
                    const astrologychart = await fetchVedicChart({ birthdate, lat, lon, tz });
                    if(!hdchart || !astrologychart) return sendResponse(`Sorry, there is an issue on the backside. Just try again.`, 201); 
                    const data = { ...userData, hdchart, astrologychart}
                    await redis.set(userid, JSON.stringify(data), 'EX', 3600);
                    
                    for(let i = 0; i < houses.length; i++) {
                        responseArr.push(astrologychart[houses[i] - 1].personalised_prediction);
                    }
                    
                    return sendResponse(`${responseArr.join(" ")}`, 201);
                }

                for(let i = 0; i < houses.length; i++) {
                    responseArr.push(userData.astrologychart[houses[i] - 1].personalised_prediction);
                }
                
                return sendResponse(`${responseArr.join(" ")}`, 201);
            }
            if (!userData.birthdate) {
                const birthdate = extractDate(message);
                if (!birthdate) {
                    return sendResponse("First of all, please enter your birthdate in the format MM/DD/YYYY.", 200);
                }
        
                if (!validateDate(birthdate)) {
                    return sendResponse("Oops, Date format is invaild. Please enter your birthdate in the format MM/DD/YYYY.", 200);
                }
                const { lat, lon, tz, location } = userData;
                const data = { userid, lat, lon, tz, location, birthdate};
                await redis.set(userid, JSON.stringify(data), 'EX', 3600);
                const formattedBirthDate = new Date(birthdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                return sendResponse(`Thank you! Your birthdate is ${formattedBirthDate}. Now, please enter your birth location to proceed. Please separate the address, city, state, country and postal code using comma`, 201);
                // return sendResponse("To provide you with personalized insights, please enter your birthdate in the format MM/DD/YYYY.", 201);
            }

            if (!userData.location) {
                const location = message;
                const formattedBirthDate = new Date(userData.birthdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                if (!location) {
                    return sendResponse(`I know Your birthdate is ${formattedBirthDate}. You have to give me at least one location information.`, 200);
                }
                
                const geometry = await extractGeometry(location);
                if (!geometry) {
                    return sendResponse("Sorry, I can't find your location on the map. Please input vaild information and separate using comma.", 200);
                }

                const { lat, lon, tz } = geometry;
                const data = { userid, birthdate: userData.birthdate, lat, lon, tz, location };
                await redis.set(userid, JSON.stringify(data), 'EX', 3600);

                return sendResponse(`Thank you! Your location is ${location}. Please feel free to ask any questions related to the following areas: Self, Wealth, Communication, Home, Creativity, Health, Partnership, Transformation, Luck, Career, Friendships, and Secrets.`, 200);
            }
        }

        // if (!message && message !== 0) {
        //     return sendResponse("Hi, I'm Oryn. To provide you with personalized insights, please enter your birthdate in the format MM/DD/YYYY.", 201);
        // }

        const birthdate = extractDate(message);
        if (!birthdate) {
            return sendResponse("First of all, please enter your birthdate in the format MM/DD/YYYY.", 200);
        }

        if (!validateDate(birthdate)) {
            return sendResponse("Oops, Date format is invaild. Please enter your birthdate in the format MM/DD/YYYY.", 200);
        }

        const data = { userid, birthdate };
        await redis.set(userid, JSON.stringify(data), 'EX', 3600);
        const standardDate = new Date(birthdate);
        return sendResponse(`Thank you! Your birthdate is ${standardDate.toLocaleDateString("en-US")}. Now, please enter your birth location to proceed.`, 201);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
