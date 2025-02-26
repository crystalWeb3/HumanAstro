import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidLocation = (location: string): boolean => {
  return location.trim().length > 0;
};

const NEUTRINO_URL = 'https://neutrinoplatform.com/api/partners';
const VEDIC_URL = 'https://api.vedicastroapi.com/v3-json/horoscope';

export const fetchHDChart = async (birthdate: string ) => {
  try {
    const response = await axios.post(`${NEUTRINO_URL}/chart`,
            { datetime: birthdate },
            { headers: { "x-api-key": process.env.NEUTRINO_KEY } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching HD Chart data:', error);
    return false;
  }
};

export const fetchHDTransit = async (birthdate: string ) => {
  try {
    const response = await axios.get(`${NEUTRINO_URL}/transit?datetime=${birthdate}`,
            { headers: { "x-api-key": process.env.NEUTRINO_KEY } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Transit data:', error);
    return false;
  }
};


export const fetchVedicChart = async (birthdate: string) => {
  try {
    const response = await axios.get(`${VEDIC_URL}/personal-characteristics?dob=${birthdate}&tob=00:00&lat=11&lon=77&tz=5.5&api_key=${process.env.VEDIC_KEY}&lang=en`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Vedic Astrology data:', error);
    return false;
  }
};

export const fetchVedicTransit = async (birthdate: string) => {
  try {
    const response = await axios.post(`${VEDIC_URL}`, { birthdate, location });
    return response.data;
  } catch (error) {
    console.error('Error fetching Vedic Astrology data:', error);
    return false;
  }
};

// Regex to extract birthdate (formats: "YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY")
const birthdateRegex = /\b(\d{4}[-/]\d{2}[-/]\d{2}|\d{2}[-/]\d{2}[-/]\d{4})\b/;

export const extractUTCDate = (input: string): string | undefined => {
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

export const getIntepretDate = async () => {
    
}