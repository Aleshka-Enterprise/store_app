import { CommonService } from "../common.service";
import axios from "axios";
import { IToken } from "../../models/users/users";

class UserService extends CommonService {
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
  }
}

export default new UserService();