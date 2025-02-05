import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContextProvider.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
