import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
});
root.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </BrowserRouter>
);
