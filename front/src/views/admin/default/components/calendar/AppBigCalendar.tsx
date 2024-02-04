import Card from "components/card";
import React, { useDebugValue, useEffect, useState } from "react";
import { Calendar, SlotInfo, momentLocalizer } from 'react-big-calendar'
import "assets/css/AppBigCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment'
import CalendarMeetingModal from "./CalendarMeetingModal";
import { useDisclosure } from "@chakra-ui/hooks";
import useCalendarMeeting from "components/hooks";
import DashboardApiService from "services/dashboard/DashboardApiService";

export type CalendarEvent = {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  id: number,
}
const event = {
  title: "event",
  id: 1,
}
const testEvents: CalendarEvent[] = [
  {
    title: "test",
    start: new Date(),
    end: new Date(new Date().getTime() + (1 * 60 * 60 * 1000)),
    id: 1,
  }
]
export type MeetingPopUpObject ={
  CalendarEvent?:CalendarEvent,
  SlotInfo?:SlotInfo,
}




function AppBigCalendar() {

  const [calendarEvents,setCalendarEvents] = useState([]);

  useEffect(() => {
    const fetch = async()=>{
      const response = await DashboardApiService.getCalendaMeeting();
      console.log(response);
      if(response.data != undefined && response.data != null){
        setCalendarEvents(response.data);
      }
    }
    fetch();
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure();
  const localizer = momentLocalizer(moment);
  const [MeetingOrSlot,setMeetingOrSlot] = useState(null);
  const setRef = (ref:MeetingPopUpObject) => {
   setMeetingOrSlot(ref);
    onOpen();
  };
  return (
<>
<CalendarMeetingModal isOpen={isOpen} onOpen={()=>onOpen
      } onClose={onClose}
      MeetingOrSlotRef={MeetingOrSlot}
      />
    <Card>
 
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={(slot) => setRef({SlotInfo:slot})}
        onSelectEvent={(e) => setRef({CalendarEvent:e})}
        style={{ height: 500, padding: 20 }}
        views={['month', 'week', 'day']}
        />
    </Card>
        </>
  );
}

export default AppBigCalendar;
