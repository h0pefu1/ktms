import axios, { AxiosRequestConfig } from "axios";
import { AuthResponse } from "types/types";
import { REACT_CHAT_SERVICE_PROD } from "./axios";

// export const API_URL = `http://testapi.amap.galex.md/api`
export const CHAT_API_URL = `https://reactktmsnode.galex.md/api`
export const $chatApi = axios.create({
    baseURL:REACT_CHAT_SERVICE_PROD
});
