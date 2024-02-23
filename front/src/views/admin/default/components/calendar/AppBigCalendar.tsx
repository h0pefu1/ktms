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
import { Drawer } from "@mui/material";

export type CalendarEvent = {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  id: number,
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

  const [isOpen, setOpen] = React.useState(false);
  const onOpen = ()=>{
    setOpen(true);
  }
  const onClose = ()=>{
    setOpen(false);
  }
  const localizer = momentLocalizer(moment);
  const [MeetingOrSlot,setMeetingOrSlot] = useState({});
  const setRef = (ref:MeetingPopUpObject) => {
   setMeetingOrSlot(ref);
    onOpen();
  };

  const handleAddCalendarMeeting=(meeting:CalendarEvent)=>{
    setCalendarEvents(prev=>[...prev,meeting])
  }
  return (
<>

      
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={(slot) => setRef({SlotInfo:slot})}
        onSelectEvent={(e) => setRef({CalendarEvent:e})}
        style={{ padding: "0.75rem" }}
        views={['month', 'week', 'day']}
        />
    </Card>

    <CalendarMeetingModal isOpen={isOpen} onOpen={() => onOpen} onClose={() => onClose()}
      MeetingOrSlotRef={MeetingOrSlot} setMeetingToCalendar={handleAddCalendarMeeting
       }      />
        </>
  );
}

export default AppBigCalendar;
