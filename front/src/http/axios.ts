import axios, { AxiosRequestConfig } from "axios";
import { AuthResponse } from "types/types";

export const API_URL = `http://testapi.amap.galex.md/api`
export const API_URL_DEV = `http://192.168.100.26:5277/api`
export const CHAT_SERVICE_URL_DEV = `http://192.168.100.26:4000/api`
export const REACT_API_LINK_PROD = "https://reactktmsapi.galex.md/api"
export const REACT_CHAT_SERVICE_PROD = "http://localhost:3001/"




export const $api = axios.create({
    withCredentials:true,
    baseURL:REACT_API_LINK_PROD
});
$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    console.log(`Bearer ${localStorage.getItem('token')}`)
    return config;
})
$api.interceptors.response.use((config)=>{
    return config;
}, async (error)=>{
    const originalRequest = error.config;
    if(error.response.status===401 && error.config && !error.config._isRetry){
        try{
    const response = await axios.get<AuthResponse>(`${REACT_API_LINK_PROD}/Token/refresh`,{withCredentials:true});
        localStorage.setItem('token',response.data.accessToken);
        return $api.request(originalRequest)
        }
        catch(e){
            console.log("НЕ АВТОРИЗОВаН");
        }
}
})


