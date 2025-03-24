import { NextRequest, NextResponse } from "next/server";
import Redis from 'ioredis';
import { UserType } from "@/lib/type";
import { extractDate, extractGeometry, validateDate, fetchHDChart, fetchVedicChart} from '../../../../lib/utils';
import axios from "axios";

// const testChatGPT = async () => {
//     try {
//         console.log("Test GPT")
//         const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//             model: 'gpt-4o',
//             messages: [
//                 {
//                     role: 'user',
//                     content: 'Are you chatgpt paid version?'
//                 }
//             ]
//         },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
//                 }
//             }
//         )

//         console.dir(response.data.choices)

//     } catch (error) {
//         console.dir(error)
//     }
// }


const askGPT = async (ask: string) => {
    try {
        // console.log("ASK GPT")
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: ask
                }
            ]
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        )

        return response.data.choices[0]?.message?.content;

    } catch (error) {
        console.log(error)
        return "Something went wrong with AI."
    }
}

export async function POST(req: NextRequest) {
    const redis = new Redis(process.env.REDIS_URL!);

    try {
        const { message, userid } = await req.json();
        // console.log('userid', userid)
        // console.log(message)
        const userDataString = await redis.get(userid);
        // console.log('userDataString', userDataString)
        // await testChatGPT()
        const sendResponse = (msg: string, status: number) =>
            NextResponse.json({ msg }, { status });



        if (userDataString) {
            const userData: UserType = JSON.parse(userDataString);
            // console.log(userData?.birthdate)

            if (userData?.birthdate && userData?.location) {
                const { birthdate, lat, lon, tz } = userData;
                const formattedBirthDate = new Date(userData.birthdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

                if (message === '') return sendResponse(`Your birthdate is ${formattedBirthDate} and Birth location ${userData.location}. Please feel free to ask any questions related to the following areas: Self, Wealth, Communication, Home, Creativity, Health, Partnership, Transformation, Luck, Career, Friendships, and Secrets.`, 201);

                // const houses = extractHouses(message);
                // if (houses.length === 0) return sendResponse(`I apologize, but I am unable to respond to questions that are outside the scope of the topic.`, 201);

                if (!userData.hdchart || !userData.astrologychart) {
                    const hdchart = await fetchHDChart(birthdate);
                    const astrologychart = await fetchVedicChart({ birthdate, lat, lon, tz });
                    if (!hdchart || !astrologychart) return sendResponse(`Sorry, there is an issue on the backside. Just try again.`, 201);
                    // console.log(hdchart)
                    const data = { ...userData, hdchart, astrologychart }
                    // console.log(data)
                    await redis.set(userid, JSON.stringify(data), 'EX', 3600);
                    // console.log(hdchart)
                    // const responseArr = [];
                    // for (let i = 0; i < houses.length; i++) {
                    //     responseArr.push(astrologychart[houses[i] - 1].personalised_prediction);
                    // }
                    const ask = JSON.stringify(userData.hdchart) + "\\n" + "This is my chart data. With this, please answer below. Don't include any chart or astrology words, it must not look like it is came from chart. Make it clear and short." + "\\n" + message;
                    // console.log(ask)
                    const gptResponse = await askGPT(ask)

                    return sendResponse(`${gptResponse}`, 201);
                }
                // console.log(userData?.hdchart)
                // const responseArr = [];
                // for (let i = 0; i < houses.length; i++) {
                //     responseArr.push(userData.astrologychart[houses[i] - 1].personalised_prediction);
                // }                
                const ask = JSON.stringify(userData.hdchart) + "\\n" + "This is my chart data. With this, please answer below. Don't include any chart or astrology words, it must not look like it is came from chart. Make it clear and short." + "\\n" + message;

                const gptResponse = await askGPT(ask)

                return sendResponse(`${gptResponse}`, 201);
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
                const data = { userid, lat, lon, tz, location, birthdate };
                await redis.set(userid, JSON.stringify(data), 'EX', 3600);
                const formattedBirthDate = new Date(birthdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                return sendResponse(`Thank you! Your birthdate is ${formattedBirthDate}. Now, please enter your birth location to proceed. Please separate the address, city, state, country and postal code using comma`, 201);
                // return sendResponse("To provide you with personalized insights, please enter your birthdate in the format MM/DD/YYYY.", 201);
            }

            if (!userData.location) {
                const location = message;
                const formattedBirthDate = new Date(userData.birthdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                if (!location) {
                    return sendResponse(`I know your birthdate is ${formattedBirthDate}. You have to give me at least one location information.`, 200);
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
