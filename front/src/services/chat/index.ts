import { AxiosResponse } from "axios";
import { $api } from "http/axios";
import { DropDownItem, IPerson } from "types/types";

export default class ChatService{
    
    static async getPersons():Promise<AxiosResponse<DropDownItem[]>>{
        return $api.get<DropDownItem[]>('dropdown/users');
    }
}