const DEV_BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
const PROD_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const NODE_ENV = process.env.NODE_ENV;

export const BASE_URL: string =
  NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;
