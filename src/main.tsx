import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./Context/ThemeContext";
import "./index.css";
import { GeminiProvider } from "./Context/GeminiContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GeminiProvider> 
      {/* context provider for gemini theme provider for theme */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </GeminiProvider>
  </React.StrictMode>
);
