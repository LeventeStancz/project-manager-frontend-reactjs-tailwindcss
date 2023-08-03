import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //creating state to store auth values
  const [authToken, setAuthToken] = useState(false);
  //for "trust this device" function
  const [trustedDevice, setTrustedDevice] = useState(
    JSON.parse(
      localStorage.getItem("trustedDevice")
        ? localStorage.getItem("trustedDevice")
        : false
    ) || false
  );

  //passing state with provider to children components
  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, trustedDevice, setTrustedDevice }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
