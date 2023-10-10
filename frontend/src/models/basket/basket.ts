import { IProduct } from "../products/products";

export interface IBasket {
  date: string;
  id: number;
  product: IProduct;
  user: number;
  quantity: number;
}