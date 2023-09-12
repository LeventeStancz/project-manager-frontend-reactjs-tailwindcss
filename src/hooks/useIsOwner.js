import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

function useIsOwner(projectid) {
  const axiosPrivate = useAxiosPrivate();
  const [isOwner, setIsOwner] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetch = async () => {
      try {
        const response = await axiosPrivate.get(
          `/projects/isowner/${projectid}`,
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          setIsOwner(response?.data?.isOwner);
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
          setIsOwner(false);
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

  return { isOwner };
}

export default useIsOwner;
