import { AuthResponse, DropDownItem, Meeting, Team } from "types/types"
import { AxiosResponse } from "axios"
import { $api } from "http/axios"
import { CalendarEvent, MeetingPopUpObject } from "views/admin/default/components/calendar/AppBigCalendar";
export default class DropDownApiService{
    static async getDropDownValue(path:string):Promise<AxiosResponse<DropDownItem[]>>{
        return $api.get<DropDownItem[]>(`dropdown/${path}`);
    }
}