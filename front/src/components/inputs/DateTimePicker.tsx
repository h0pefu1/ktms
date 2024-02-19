import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import React from "react";
import TextField from '@mui/material/TextField';
import { DatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import "../../assets/css/MiniCalendar.css"
function DatePickerApp() {
  const [value, setValue] = React.useState(
    moment('2018-01-01T00:00:00.000Z'),
  );
  return (
    <DatePicker 
    />
  );
}

export default DatePickerApp