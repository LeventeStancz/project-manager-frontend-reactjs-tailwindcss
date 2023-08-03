import axios from "../services/axios";
import useAuth from "./useAuth";

//custom hook to request new access token
//error handling is with axios interceptors
const useRefreshToken = () => {
  const { setAuthToken } = useAuth();

  const getNewAccessToken = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuthToken(response.data.accessToken);
    return response.data.accessToken;
  };

  return getNewAccessToken;
};

export default useRefreshToken;
