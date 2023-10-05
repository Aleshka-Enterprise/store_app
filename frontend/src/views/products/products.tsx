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

  useEffect(() => {
    ProductService.getProducts(categoryId, page).then((res): void => {
      setProducts(res);
    });
  }, [categoryId, page]);

  const onCategoryClick = (categoryId?: number): void => {
    selectedPage(1);
    setCategoryId(categoryId);
  };

  const productsCategoriesMenu = () => {
    const categories: { id?: number; title: string }[] = [{ title: "Все категории" }, ...productsCategories];

    return (
      <>
        {categories?.map(category => (
          <div
            key={category.id}
            style={{ color: category.id === categoryId ? "red" : "blue" }}
            onClick={(): void => onCategoryClick(category.id)} className='list-group-item'
          >
            {category.title}
          </div>
        ))}
      </>
    );
  }

  return (
    <div className='products'>
      <HeaderMenu />
      <div className='container content'>
        <div className='categories'>
          <h1>Store</h1>
          <div className='list-group'>{productsCategoriesMenu()}</div>
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
          {!!products?.count && products.count > 1 && (
            <div className='product-paginator center'>
              <Paginator
                onPageSelect={selectedPage}
                selectedPage={page}
                maxCount={Math.ceil((products?.count || 0) / PAGE_RANGE)}
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
