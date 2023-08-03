import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

//custom hook to use the auth context with one import
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
