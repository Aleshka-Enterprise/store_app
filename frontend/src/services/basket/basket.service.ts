import { CommonService } from "../common.service";
import axios from "axios";
import { converCase } from "../../utils/utils";
import { IBasket } from "../../models/basket/basket";

class BasketService extends CommonService {
  url = `${this.baseURL}/api/basket`;

  create(id: number): Promise<any> {
    return axios.post<any>(`${this.url}/add/${id}`).then(
      (response) => {
        return converCase(response.data, "camel");
      },
      reason => Promise.reject(reason)
    )
  };

  getUserBasket(): Promise<IBasket[]> {
    return axios.get<IBasket[]>(`${this.url}/`).then(
      (response) => {
        return response.data;
      },
      reason => Promise.reject(reason)
    )
  };

  basketUpdate(basket: IBasket): Promise<IBasket> {
    return axios.patch<IBasket>(`${this.url}/${basket.id}/`, { quantity: basket.quantity }).then(
      (response) => {
        return response.data;
      },
      reason => Promise.reject(reason)
    )
  };
};

export default new BasketService();
