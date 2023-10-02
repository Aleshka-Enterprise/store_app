import React from "react";
import { useNavigate } from "react-router-dom";
import "./header-menu.scss"

const HeaderMenu = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <div className='header-menu'>
      <div className='container'>
        <div className='logo' onClick={(): void => navigate("/")}>Store</div>
      </div>
    </div>
  );
};

export default HeaderMenu;
