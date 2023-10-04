import React from "react";
import { IProduct } from "../../models/products/products";

import "./product-card.scss";

interface ProductCartProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCartProps): React.ReactElement => {
  return (
    <div className='product-card'>
      <div className='card-img'>
        <img src={product.image} alt={product.name} />
      </div>
      <div className='title'>
        <h4 className='card-title'>{product.name}</h4>
        <p className='description'>{product.short_description}</p>
        <h5 className='price'>{product.price} руб.</h5>
      </div>
      <div className='card-footer'>
        <button>Отправить в корзину</button>
      </div>
    </div>
  );
};

export default ProductCard;
