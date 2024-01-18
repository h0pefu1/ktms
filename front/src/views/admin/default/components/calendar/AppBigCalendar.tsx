import Card from "components/card";
import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "assets/css/AppBigCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment'

export type CalendarEvent={
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean
    resource?: any,
}
const testEvents:CalendarEvent[] = [
    {
            title:"test",
            start: new Date(),
            end: new Date(new Date().getTime()+ (1*60*60*1000))
    }
]
function AppBigCalendar() {
    const localizer = momentLocalizer(moment)
  return (
    <Card>
    <Calendar
    localizer={localizer}
    events={testEvents}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500,padding:20 }}
    views={['month', 'week', 'day']}
  />
  </Card>
  );
}

export default AppBigCalendar;
