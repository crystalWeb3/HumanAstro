import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { HouseType } from "./type";
import { houses } from "./const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidLocation = (location: string): boolean => {
  return location.trim().length > 0;
};

const NEUTRINO_URL = 'https://neutrinoplatform.com/api/partners';
const VEDIC_URL = 'https://api.vedicastroapi.com/v3-json/horoscope';

export const fetchHDChart = async (birthdate: string ) => {
  const formattedBirthDate = new Date(birthdate.split('/').join('-')).toUTCString();
  try {
    const response = await axios.post(`${NEUTRINO_URL}/chart`,
            { datetime: formattedBirthDate },
            { headers: { "x-api-key": process.env.NEUTRINO_KEY } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching HD Chart data:', error);
    return false;
  }
};

export const fetchHDTransit = async (birthdate: string ) => {
  const formattedBirthDate = new Date(birthdate.split('/').join('-')).toUTCString();
  try {
    const response = await axios.get(`${NEUTRINO_URL}/transit?datetime=${formattedBirthDate}`,
            { headers: { "x-api-key": process.env.NEUTRINO_KEY } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Transit data:', error);
    return false;
  }
};


export const fetchVedicChart = async ({ birthdate, lat, lon, tz } : {birthdate: string, lat: number, lon: number, tz: number}) => {
  const [month, day, year] = birthdate.split('/');
  const newbirthdate = `${day}/${month}/${year}`;
  try {
    const response = await axios.get(`${VEDIC_URL}/personal-characteristics?dob=${newbirthdate}&tob=00:00&lat=${lat}&lon=${lon}&tz=${tz}&api_key=${process.env.VEDIC_KEY}&lang=en`);
    const data = response.data;
    console.log(response.data)
    if(data.status !== 200) return false;
    return data.response as HouseType[];
  } catch (error) {
    console.error('Error fetching Vedic Astrology data:', error);
    return false;
  }
};

export const fetchVedicTransit = async ({ birthdate, lat, lon, tz } : {birthdate: string, lat: number, lon: number, tz: number}) => {
  const [month, day, year] = birthdate.split('/');
  const newbirthdate = `${day}/${month}/${year}`;
  try {
    const response = await axios.post(`${VEDIC_URL}`, { birthdate: newbirthdate, location, lat, lon, tz });
    return response.data;
  } catch (error) {
    console.error('Error fetching Vedic Astrology data:', error);
    return false;
  }
};

// Regex to extract birthdate (formats: "YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY")
const birthdateRegex = /\b(\d{4}[-/]\d{2}[-/]\d{2}|\d{2}[-/]\d{2}[-/]\d{4})\b/;

export const extractDate = (input: string): string | undefined => {
  const birthdateMatch = input.match(birthdateRegex);
  if (!birthdateMatch) {
    return undefined;
  }

  const dateString = birthdateMatch[0];
  let dateParts: string[];

  // Split the date string based on the delimiter (- or /)
  if (dateString.includes('-')) {
    dateParts = dateString.split('-');
  } else if (dateString.includes('/')) {
    dateParts = dateString.split('/');
  } else {
    return undefined;
  }

  // Handle different date formats and convert to MM/DD/YYYY
  let month: string, day: string, year: string;

  if (dateParts.length === 3) {
    // If the first part is a 4-digit year (YYYY/MM/DD or YYYY-DD-MM format)
    if (dateParts[0].length === 4) {
      year = dateParts[0];
      month = dateParts[1];
      day = dateParts[2];
    } else {
      // If the first part is a 2-digit day (DD/MM/YYYY format)
      month = dateParts[0];
      day = dateParts[1];
      year = dateParts[2];
    }
  } else {
    return undefined;
  }

  // Ensure the month and day are 2 digits (e.g., "03" instead of "3")
  month = month.padStart(2, '0');
  day = day.padStart(2, '0');

  // Return the formatted string as MM/DD/YYYY
  return `${month}/${day}/${year}`;
};

export const generateCode = (): string  => {
  const uuid = uuidv4();
  return uuid.slice(0, 10);
}

export const validateDate = (dateString:string): boolean => {
  const date = new Date(dateString.split('/').join('-'));
  console.log(date.getTime())
  return !isNaN(date.getTime());
}

export const extractGeometry = async (location: string) => {
  const BASE_URL = "https://api.opencagedata.com/geocode/v1/json";

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        q: location,
        key: process.env.OPENCAGE_KEY
      },
    });
    const { status, results } = response.data;
    console.log(response.data)
  
    if(status?.code !== 200 || !status?.code) return null;
  
    if(results.length === 0) return null;
    return {
      lat: Number(results[0].geometry.lat),
      lon: Number(results[0].geometry.lng),
      tz: (Number(results[0].annotations.timezone.offset_sec) / 3600).toFixed(2)
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const extractHouses = (input: string): number[] | [] => {
  const num_houses = [];
  for (const key in houses) {
    if(input.toLowerCase().includes(key)) {
      console.log(key)
      num_houses.push(houses[key]);
    }
  }
  return num_houses;
}

// const date = {
//    "results" : [
//       {
//          "annotations" : {
//             "DMS" : {
//                "lat" : "23\u00b0 32' 13.54632'' S",
//                "lng" : "46\u00b0 50' 9.50460'' W"
//             },
//             "MGRS" : "23KLP1257795822",
//             "Maidenhead" : "GG66nl91qc",
//             "Mercator" : {
//                "x" : -5213756.721,
//                "y" : -2680044.786
//             },
//             "OSM" : {
//                "edit_url" : "https://www.openstreetmap.org/edit?way=185327107#map=17/-23.53710/-46.83597",
//                "note_url" : "https://www.openstreetmap.org/note/new#map=17/-23.53710/-46.83597&layers=N",
//                "url" : "https://www.openstreetmap.org/?mlat=-23.53710&mlon=-46.83597#map=17/-23.53710/-46.83597"
//             },
//             "UN_M49" : {
//                "regions" : {
//                   "AMERICAS" : "019",
//                   "BR" : "076",
//                   "LATIN_AMERICA" : "419",
//                   "SOUTH_AMERICA" : "005",
//                   "WORLD" : "001"
//                },
//                "statistical_groupings" : [
//                   "LEDC"
//                ]
//             },
//             "callingcode" : 55,
//             "currency" : {
//                "decimal_mark" : ",",
//                "html_entity" : "R$",
//                "iso_code" : "BRL",
//                "iso_numeric" : "986",
//                "name" : "Brazilian Real",
//                "smallest_denomination" : 5,
//                "subunit" : "Centavo",
//                "subunit_to_unit" : 100,
//                "symbol" : "R$",
//                "symbol_first" : 1,
//                "thousands_separator" : "."
//             },
//             "flag" : "\ud83c\udde7\ud83c\uddf7",
//             "geohash" : "6gydn5pn6xqbjyhsscm7",
//             "qibla" : 69.01,
//             "roadinfo" : {
//                "drive_on" : "right",
//                "road" : "Rua Cafel\u00e2ndia",
//                "road_type" : "residential",
//                "speed_in" : "km/h"
//             },
//             "sun" : {
//                "rise" : {
//                   "apparent" : 1718790540,
//                   "astronomical" : 1718785740,
//                   "civil" : 1718789100,
//                   "nautical" : 1718787360
//                },
//                "set" : {
//                   "apparent" : 1718828940,
//                   "astronomical" : 1718833740,
//                   "civil" : 1718830380,
//                   "nautical" : 1718832060
//                }
//             },
//             "timezone" : {
//                "name" : "America/Sao_Paulo",
//                "now_in_dst" : 0,
//                "offset_sec" : -10800,
//                "offset_string" : "-0300",
//                "short_name" : "BRT"
//             },
//             "what3words" : {
//                "words" : "reunion.risk.brothers"
//             }
//          },
//          "bounds" : {
//             "northeast" : {
//                "lat" : -23.5370411,
//                "lng" : -46.835665
//             },
//             "southwest" : {
//                "lat" : -23.5373596,
//                "lng" : -46.8374493
//             }
//          },
//          "components" : {
//             "ISO_3166-1_alpha-2" : "BR",
//             "ISO_3166-1_alpha-3" : "BRA",
//             "ISO_3166-2" : [
//                "BR-SP"
//             ],
//             "_category" : "road",
//             "_normalized_city" : "Carapicu\u00edba",
//             "_type" : "road",
//             "city" : "Carapicu\u00edba",
//             "city_district" : "Carapicu\u00edba",
//             "continent" : "South America",
//             "country" : "Brazil",
//             "country_code" : "br",
//             "county" : "Regi\u00e3o Metropolitana de S\u00e3o Paulo",
//             "municipality" : "Regi\u00e3o Imediata de S\u00e3o Paulo",
//             "postcode" : "06386",
//             "region" : "Southeast Region",
//             "road" : "Rua Cafel\u00e2ndia",
//             "road_type" : "residential",
//             "state" : "S\u00e3o Paulo",
//             "state_code" : "SP",
//             "state_district" : "Regi\u00e3o Geogr\u00e1fica Intermedi\u00e1ria de S\u00e3o Paulo",
//             "suburb" : "Parque Jos\u00e9 Alexandre"
//          },
//          "confidence" : 9,
//          "formatted" : "Rua Cafel\u00e2ndia, Parque Jos\u00e9 Alexandre, Carapicu\u00edba - SP, 06386, Brazil",
//          "geometry" : {
//             "lat" : -23.5370962,
//             "lng" : -46.8359735
//          }
//       }
//    ],
//    "status" : {
//       "code" : 200,
//       "message" : "OK"
//    },
//    "stay_informed" : {
//       "blog" : "https://blog.opencagedata.com",
//       "mastodon" : "https://en.osm.town/@opencage"
//    },
//    "thanks" : "For using an OpenCage API",
//    "timestamp" : {
//       "created_http" : "Wed, 19 Jun 2024 11:03:54 GMT",
//       "created_unix" : 1718795034
//    },
//    "total_results" : 1
// }
