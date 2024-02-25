import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Provider } from "react-redux";
import { store } from "store/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {

          borderRadius: 16,
          boxShadow: '1px 1px 2px #dfdede',
        },
      }
    }
  }
})
root.render(
  <BrowserRouter>
   <Provider store={store}>
  <ThemeProvider theme={theme}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <App />
    </LocalizationProvider>
    </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
