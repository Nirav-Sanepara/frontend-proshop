import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./bootstrap.min.css";
import Footer from "./componant/Footer";
import Header from "./componant/Header";

import ThemeProvider from "./theme";
import { ROUTES } from "./Routers/index";
import PrivateContainer from "./Routers/private";
import PublicContainer from "./Routers/public";

import "./i18n";
import AdminViewMerchant from "./datatable/MerchantPage/adminViewMerchant";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Toaster position="top-right" />
        <main className="py-3">
          <Container>
            <Routes>
              {ROUTES.map(({ Component, isPrivate, path, roles }) => (
                <Route
                  exact
                  path={path}
                  key={path}
                  element={
                    isPrivate ? (
                      <PrivateContainer roles={roles}>
                        <Component />
                      </PrivateContainer>
                    ) : (
                      <PublicContainer>
                        <Component />
                      </PublicContainer>
                    )
                  }
                />
                
              ))}          
               </Routes> 
         
    {/* <AdminViewMerchant/> */}
        </Container>
           </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
