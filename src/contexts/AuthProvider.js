import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //creating state to store auth values
  const [auth, setAuth] = useState(false);
  //for "trust this device" function

  const [trustedDevice, setTrustedDevice] = useState(
    localStorage.getItem("trustedDevice") || false
  );

  //passing state with provider to children components
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, trustedDevice, setTrustedDevice }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
