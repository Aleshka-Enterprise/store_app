import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/home/home";
import Products from "./views/products/products";
import Autorization from "./views/autorization/autorization";

import "./App.css";

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='products' element={<Products />}/>
        <Route path='autorization' element={<Autorization />}/>
        <Route
          path='*'
          element={<Navigate to='/' replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
