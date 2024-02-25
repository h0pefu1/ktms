import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import React from "react";
import TextField from '@mui/material/TextField';
import { DateTimePicker,DatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import "../../assets/css/MiniCalendar.css"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MUIProviderTheme from "components/MUIProviderComponents/MUIProviderTheme";



function DatePickerApp() {
  const [value, setValue] = React.useState(
    moment('2018-01-01T00:00:00.000Z'),
  );
  return (
    <MobileDateTimePicker 
    defaultValue={moment('2022-04-17T15:30')} />
  );
}

export default DatePickerApp