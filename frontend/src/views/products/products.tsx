import React, { useEffect, useState } from "react";
import HeaderMenu from "../../components/header-menu/header-menu";
import Slider from "../../components/slider/slider";
import ProductCard from "../../components/product-card/product-card";
import Paginator from "../../components/paginator/paginator";
import Footer from "../../components/footer/footer";
import { ICategory, IProduct } from "../../models/products/products";
import ProductService from "../../services/proucts/products.service";

import slider1 from "../../asserts/images/slides/slide-1.jpg";
import slider2 from "../../asserts/images/slides/slide-2.jpg";
import slider3 from "../../asserts/images/slides/slide-3.jpg";
import { Page } from "../../models/common";

import "./products.scss";

const PAGE_RANGE = 3;

const Products = (): React.ReactElement => {
  const [page, selectedPage] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>();
  const [productsCategories, setProductsCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<Page<IProduct>>();

  const slidersList: string[] = [slider1, slider2, slider3];

  useEffect(() => {
    ProductService.getProductsCategories().then((res): void => {
      setProductsCategories(res);
    });
  }, []);

  // TODO Реализавать фильтрацию/пагинацию продуктов
  useEffect(() => {
    ProductService.getProducts(categoryId).then((res): void => {
      setProducts(res);
    });
  }, [categoryId, page]);

  return (
    <div className='products'>
      <HeaderMenu />
      <div className='container content'>
        <div className='categories'>
          <h1>Store</h1>
          <div className='list-group'>
            <div className='list-group-item' onClick={(): void => setCategoryId(undefined)}>
              Все категории
            </div>
            {productsCategories?.map(category => (
              <div key={category.id} onClick={(): void => setCategoryId(category.id)} className='list-group-item'>
                {category.title}
              </div>
            ))}
          </div>
        </div>
        <div className='products-content'>
          <div className='slider'>
            <Slider imgs={slidersList} />
          </div>
          <div className='products-list'>
            {products?.results?.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          {products?.count && (
            <div className='product-paginator center'>
              <Paginator
                onPageSelect={selectedPage}
                selectedPage={page}
                maxCount={(products?.count || 0) / PAGE_RANGE}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
