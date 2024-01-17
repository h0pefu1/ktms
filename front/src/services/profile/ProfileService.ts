import { AuthResponse, Team } from "types/types"
import { AxiosResponse } from "axios"
import { $api } from "http/axios"
export default class ProfileService{
    static async getTeamsByUser():Promise<AxiosResponse<Team[]>>{
        return  $api.get('/profile/userteams');
    }
}