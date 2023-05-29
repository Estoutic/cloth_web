import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import LoginContainer from "./main/pages/auth/LoginContainer";
import Basket from "./main/pages/basket/Basket";
import HomePage from "./main/pages/home/HomePage";
import ProductList from "./main/pages/list/ProductList";
import ProductPage from "./main/pages/product/ProductPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/lists" element={<Basket />} />
          <Route path="/:id" element={<ProductPage />} />
          <Route path="/lists/:id" element={<ProductList />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
