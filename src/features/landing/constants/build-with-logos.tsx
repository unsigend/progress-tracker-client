const BASE_IMAGE_URL = "/image/build-with-logos";

/**
 * BuildWithLogo - Interface for build with logo data
 */
export interface BuildWithLogo {
    name: string;
    url: string;
}

/**
 * buildWithLogos - The data for the build with logos
 */
export const buildWithLogos: BuildWithLogo[] = [
    {
        name: "Express",
        url: `${BASE_IMAGE_URL}/express.svg`,
    },
    {
        name: "NestJS",
        url: `${BASE_IMAGE_URL}/nestjs.svg`,
    },
    {
        name: "Node.js",
        url: `${BASE_IMAGE_URL}/nodedotjs.svg`,
    },
    {
        name: "postgresql",
        url: `${BASE_IMAGE_URL}/postgresql.svg`,
    },
    {
        name: "Prisma",
        url: `${BASE_IMAGE_URL}/prisma.svg`,
    },
    {
        name: "React",
        url: `${BASE_IMAGE_URL}/react.svg`,
    },
    {
        name: "refine",
        url: `${BASE_IMAGE_URL}/refine.svg`,
    },
    {
        name: "shadcn/ui",
        url: `${BASE_IMAGE_URL}/shadcnui.svg`,
    },
    {
        name: "Tailwind CSS",
        url: `${BASE_IMAGE_URL}/tailwindcss.svg`,
    },
    {
        name: "TypeScript",
        url: `${BASE_IMAGE_URL}/typescript.svg`,
    },
];
