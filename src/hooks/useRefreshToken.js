import axios from "../services/axios";
import useAuth from "./useAuth";

//custom hook to request new access token
//error handling is with axios interceptors
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const getNewAccessToken = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };

  return getNewAccessToken;
};

export default useRefreshToken;
