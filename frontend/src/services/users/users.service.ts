import { CommonService } from "../common.service";
import axios from "axios";
import { IToken, IUser } from "../../models/users/users";
import UsersStore from "../../store/users";

class UsersService extends CommonService {
  protected url = `${this.baseURL}/api/user`;

  autorization(data: { username: string; password: string }): Promise<IToken> {
    return axios.post<IToken>(`${this.url}/autorization/`, data).then(
      response => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        axios.defaults.headers.common = { Authorization: `Token ${token}` };
        return response.data;
      },
      reason => Promise.reject(reason)
    );
  };

  getCurrentUser(): Promise<IUser> {
    return axios.get<IUser>(`${this.url}/get_current_user/`).then(
      response => {
        UsersStore.user = response.data;
        return response.data;
      },
      reason => Promise.reject(reason)
    );
  };

  logout(): Promise<void> {
    return axios.get<void>(`${this.url}/logout/`).then(
      () => {
        UsersStore.user = undefined;
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      },
      reason => Promise.reject(reason)
    );
  };
}

export default new UsersService();