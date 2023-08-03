import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { RotatingLines } from "react-loader-spinner";

//if the user leaves the page and returns initiate a new access token
//so the user stays logged in the application
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getNewAccessToken = useRefreshToken();
  const { auth, trustedDevice } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await getNewAccessToken();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!trustedDevice ? (
        <Outlet />
      ) : isLoading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <RotatingLines
            strokeColor="#A477CC"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
