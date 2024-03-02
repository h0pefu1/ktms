import axios, { AxiosRequestConfig } from "axios";
import { AuthResponse } from "types/types";

// export const API_URL = `http://testapi.amap.galex.md/api`
export const CHAT_API_URL = `http://localhost:4000/api`
export const $chatApi = axios.create({
    baseURL:CHAT_API_URL
});
