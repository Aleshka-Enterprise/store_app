import React from "react";

import "./product-card.scss";

const ProductCard = (): React.ReactElement => {
  return (
    <div className='product-card'>
      <div className='card-img'></div>
      <div className='title'>
        <h4 className='card-title'>Худи черного цвета с монограммами adidas Originals</h4>
        <p className='description'>Мягкая ткань для свитшотов. Стиль и комфорт – это образ жизни.</p>
        <h5 className='price'>6999,00 руб.</h5>
      </div>
      <div className='card-footer'>
        <button>
            Отправить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
