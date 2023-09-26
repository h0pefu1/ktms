import { AuthResponse, Meeting } from "types/types"
import { AxiosResponse } from "axios"
import { $api } from "http/axios"
export default class DashboardApiService{
    static async getMeeting():Promise<AxiosResponse<Meeting[]>>{
        return $api.get<Meeting[]>('Dashboard/getmeetings');
    }
}