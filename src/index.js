import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { AuthProvider } from "./contexts/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </SkeletonTheme>
);
