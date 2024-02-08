import { AuthResponse, Meeting } from "types/types"
import { AxiosResponse } from "axios"
import { $api } from "http/axios"
import { CalendarEvent, MeetingPopUpObject } from "views/admin/default/components/calendar/AppBigCalendar";
export default class DashboardApiService{
    static async getCalendaMeeting():Promise<AxiosResponse<CalendarEvent[]>>{
        return $api.get<CalendarEvent[]>('Dashboard/getcalendarmeetings');
    }
    static async calendarMeetingCreateOrUpdate(meeting:Meeting):Promise<AxiosResponse<CalendarEvent>>{
        return $api.post<CalendarEvent>('dashboard/calendarmeeting',meeting);
    }
}