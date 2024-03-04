import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment, { Moment } from "moment";
import React from "react";
import TextField from '@mui/material/TextField';
import { DateTimePicker,DatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import "../../assets/css/MiniCalendar.css"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MUIProviderTheme from "components/MUIProviderComponents/MUIProviderTheme";


export type DatePickerType={
  value:Moment,
  onChange:any
}

function DatePickerApp({value,onChange}:DatePickerType) {
  return (
   <>
   </>
  );
}

export default DatePickerApp