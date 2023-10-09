import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/home/home";
import Products from "./views/products/products";
import Autorization from "./views/autorization/autorization";
import Registration from "./views/registration/registration";
import { userInitialization } from "./utils/user";
import UsersService from "./services/users/users.service";
import Profile from "./views/profile/profile";

import "./App.css";

const App = (): React.ReactElement => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userInitialization();
      UsersService.getCurrentUser();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='autorization' element={<Autorization />} />
        <Route path='registration' element={<Registration />} />
        <Route path='profile' element={<Profile />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
