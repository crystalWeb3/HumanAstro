export type MessageType = {
    type: number;
    content: string;
    [key: string]: unknown;
}

export type TypingStateType = {
    type: number,
    isTyping: boolean
}

export type UserType = {
    userid: string;
    birthdate: string;
    location: string;
    lat: number;
    lon: number;
    tz:number;
    hdchart: Record<string, unknown>;
    astrologychart: HouseType[];
}

export type GeometryType = {
    results: Array<{
      geometry: {
        lat: number;
        lng: number;
      };
      annotations: {
        timezone: {
          offset_sec: number;
        };
      };
      
    }>;
    status: {
    code: number;
    };
  };
  
  export type HouseType = {
    "current_house": number,
    "verbal_location": string,
    "current_zodiac": string,
    "lord_of_zodiac": string,
    "lord_zodiac_location": string,
    "lord_house_location": number,
    "personalised_prediction": string,
    "lord_strength": string
  }