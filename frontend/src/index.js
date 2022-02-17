import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <Router them={theme}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
