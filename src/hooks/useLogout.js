import axios from "../services/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuthToken } = useAuth();

  const logout = async () => {
    setAuthToken(false);
    try {
      await axios("/auth/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
