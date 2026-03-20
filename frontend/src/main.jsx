import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ShopContextProvider from "./context/ShopContext";
import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ShopContextProvider>
        <App />
        <SpeedInsights />
      </ShopContextProvider>
    </BrowserRouter>
);
