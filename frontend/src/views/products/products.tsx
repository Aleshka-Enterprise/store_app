import React, { useState } from "react";
import HeaderMenu from "../../components/header-menu/header-menu";
import Slider from "../../components/slider/slider";
import ProductCard from "../../components/product-card/product-card";
import Paginator from "../../components/paginator/paginator";
import Footer from "../../components/footer.tsx/footer";

import slider1 from "../../asserts/images/slides/slide-1.jpg";
import slider2 from "../../asserts/images/slides/slide-2.jpg";
import slider3 from "../../asserts/images/slides/slide-3.jpg";

import "./products.scss";

const Products = (): React.ReactElement => {
  const [page, selectedPage] = useState<number>(0);
  const slidersList: string[] = [slider1, slider2, slider3];

  return (
    <div className='products'>
      <HeaderMenu />
      <div className='container content'>
        <div className='categories'>
          <h1>Store</h1>
          <div className='list-group'>
            <div className='list-group-item'>
              Все товары
            </div>
            <div className='list-group-item'>
              Все товары
            </div>
            <div className='list-group-item'>
              Все товары
            </div>
            <div className='list-group-item'>
              Все товары
            </div>
          </div>
        </div>
        <div className='products-content'>
          <div className='slider'>
            <Slider imgs={slidersList} />
          </div>
          <div className='products-list'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className='product-paginator center'>
            <Paginator onPageSelect={selectedPage} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Products;
