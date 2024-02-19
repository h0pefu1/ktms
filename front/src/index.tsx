import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import React from "react";
import App from "./App";
import { Provider } from 'react-redux'
import { store } from "store/store";
import { ChakraProvider } from '@chakra-ui/react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider, createMuiTheme } from "@mui/material/styles";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createMuiTheme();
root.render(
  <BrowserRouter>
   <ThemeProvider theme={theme}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
   <ChakraProvider>
  <Provider store={store}>
    <App />
    </Provider>
    </ChakraProvider>
    </LocalizationProvider>
    </ThemeProvider>
  </BrowserRouter>
);
