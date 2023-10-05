import axios from "axios";

export const userInitialization = (): void => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common = { Authorization: `Token ${token}` }; 
  };
};
