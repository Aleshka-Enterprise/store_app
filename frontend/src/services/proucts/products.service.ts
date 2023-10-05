import { ICategory, IProduct } from "../../models/products/products";
import { CommonService } from "../common.service";
import { Page } from "../../models/common";
import axios from "axios";

class ProductService extends CommonService {
  protected url = `${this.baseURL}/api/product`;

  getProducts(categotyId?: number, page?: number): Promise<Page<IProduct>> {
    return axios.get<Page<IProduct>>(`${this.url}/products-list/`, { params: { category_id: categotyId, page} }).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }

  getProductsCategories(): Promise<ICategory[]> {
    return axios.get<ICategory[]>(`${this.url}/categorys`).then(
      response => response.data,
      reason => Promise.reject(reason)
    );
  }
}

export default new ProductService();
