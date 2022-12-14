import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { REACT_APP_URL } from "@env";

const useAxios = () => {
  const authCtx = useContext(AuthContext);
  const baseURL = REACT_APP_URL;
  const axiosInstance = axios.create({
    baseURL,

    headers: {
      "x-access-token": authCtx.token,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        authCtx.logout();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
