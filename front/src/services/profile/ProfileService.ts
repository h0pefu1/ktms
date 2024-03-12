import { AuthResponse, Team, UserAdditional } from "types/types"
import { AxiosResponse } from "axios"
import { $api } from "http/axios"
export default class ProfileService{
    static async getTeamsByUser():Promise<AxiosResponse<Team[]>>{
        return  $api.get('/profile/userteams');
    }
    static async getUserAdditional():Promise<AxiosResponse<UserAdditional>>{
        return  $api.get('/profile/useradditional');
    }
    static async editUserAdditional(userdata: any):Promise<AxiosResponse<UserAdditional>>{
        console.log(userdata);
        return  $api.post('/profile/edit', userdata);
    }
}