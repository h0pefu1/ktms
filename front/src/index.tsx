import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme();
root.render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ChakraProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </BrowserRouter>
);
