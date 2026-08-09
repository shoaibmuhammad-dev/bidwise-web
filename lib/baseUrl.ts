const DEV_API_URL = "http://localhost:4001/api";
const PROD_API_URL = "https://bidwise-backend-production.up.railway.app/api";
const ENV = "DEV";

export const BASE_URL: string = ENV === "DEV" ? DEV_API_URL : PROD_API_URL;
