import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

function useIsAdmin() {
  const axiosPrivate = useAxiosPrivate();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetch = async () => {
      try {
        const response = await axiosPrivate.get("/admin/check", {
          signal: controller.signal,
        });
        if (isMounted) {
          setIsAdmin(response?.data?.isAdmin);
        }
      } catch (error) {
        if (isMounted) {
          if (
            !error.response?.data?.clientMsg ||
            !error.response?.data?.error
          ) {
            console.log("Server offline. Try again later.");
          } else {
            console.log(error.response.data.error);
          }
          setIsAdmin(false);
        }
      }
    };

    fetch();

    const cleanUp = () => {
      isMounted = false;
      controller.abort();
    };

    return cleanUp;
  }, []);

  return { isAdmin };
}

export default useIsAdmin;
