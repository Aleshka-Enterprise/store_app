import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";
import "./header-menu.scss";

const HeaderMenu = (): React.ReactElement => {
  const [isMenuDisplayed, setMenuDisplayed] = useState<boolean>(false);
  const navigate = useNavigate();

  const dropdownMenu = (): React.ReactElement => {
    return (
      <div className='dropdown-menu'>
        <li>Профиль</li>
        <li>Заказы</li>
        <li>Админ-панель</li>
        <hr />
        <li>Выйти</li>
      </div>
    );
  };

  return (
    <div className='header-menu'>
      <div className='container'>
        <div className='logo' onClick={(): void => navigate("/")}>
          Store
        </div>
        <div className='navbar-nav'>
          <div className='elem' onClick={(): void => navigate("/products/")}>
            Каталог
            <i className='fa fa-shopping-bag'></i>
          </div>
          <div className='elem' onClick={(): void => navigate("/autorization/")}>
            Войти
            <i className='fa fa-sign-in' aria-hidden='true'></i>
          </div>
          <div style={{ position: "relative" }} onClick={(): void => setMenuDisplayed(!isMenuDisplayed)}>
            <i className='fa fa-user-circle elem' aria-hidden='true'></i>
            {isMenuDisplayed && dropdownMenu()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
