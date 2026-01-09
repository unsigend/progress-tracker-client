const BASE_IMAGE_URL = "/image/university-logo";

/**
 * UniversityLogo - Interface for university logo data
 */
export interface UniversityLogo {
    name: string;
    url: string;
    value: string; // The value to use in query params (e.g., "CMU", "MIT")
}

/**
 * universityLogos - The data for the university logos
 */
export const universityLogos: UniversityLogo[] = [
    {
        name: "Berkeley",
        url: `${BASE_IMAGE_URL}/berkeley.jpeg`,
        value: "Berkeley",
    },
    {
        name: "CMU",
        url: `${BASE_IMAGE_URL}/CMU.jpeg`,
        value: "CMU",
    },
    {
        name: "Harvard",
        url: `${BASE_IMAGE_URL}/harvard.svg`,
        value: "Harvard",
    },
    {
        name: "MIT",
        url: `${BASE_IMAGE_URL}/MIT.jpeg`,
        value: "MIT",
    },
    {
        name: "Princeton",
        url: `${BASE_IMAGE_URL}/princeton.svg`,
        value: "Princeton",
    },
    {
        name: "Stanford",
        url: `${BASE_IMAGE_URL}/Stanford.jpeg`,
        value: "Stanford",
    },
];
