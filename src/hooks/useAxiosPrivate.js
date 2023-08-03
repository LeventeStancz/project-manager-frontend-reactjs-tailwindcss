import { axiosPrivate } from "../services/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const getNewAccessToken = useRefreshToken();
  const { authToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        //not a retry, first request
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        //403 --> failed because of expired access token
        //prevRequest.sent --> this helps to only retry once after a failed request
        //get new access token and set in headers
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAcessToken = await getNewAccessToken();
          prevRequest.headers["Authorization"] = `Bearer ${newAcessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    //cleanup function to remove interceptor
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [authToken, getNewAccessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
