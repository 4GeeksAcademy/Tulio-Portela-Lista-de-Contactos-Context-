// Layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import { AppContextProvider } from "./store/appContext"; // Corrigi a importação
import { NewContact } from "./views/newContact";
import ScrollToTop from "./component/scrollToTop";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <AppContextProvider>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/single/:theid" element={<Single />} />
            <Route path="/contact/:id" element={<NewContact />} />
            <Route path="/newContact" element={<NewContact />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default Layout;
