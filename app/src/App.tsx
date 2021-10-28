import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeWrapper } from "./components";
import { Routes } from "./routes";

function App() {
  return (
    <ThemeWrapper>
      <BrowserRouter basename="/">
        <CssBaseline />
        <Routes />
      </BrowserRouter>
    </ThemeWrapper>
  );
}

export default App;
