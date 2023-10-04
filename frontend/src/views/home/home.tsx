import React from "react";
import HeaderMenu from "../../components/header-menu/header-menu";

import "./home.scss";
import { useNavigate } from "react-router-dom";

const Home = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <HeaderMenu />
      <div className='container content'>
        <h1>Store</h1>
        <p>
          Новые образы и лучшие бренды на Store. Бесплатная доставка по всему миру! Аутлет: до -70% Собственный бренд.
          -20% новым покупателям.
        </p>
        <button onClick={(): void => navigate("products")}>Начать покупки</button>
      </div>
    </div>
  );
};

export default Home;
