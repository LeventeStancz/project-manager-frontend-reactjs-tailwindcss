import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

function useAxiosGetFetch(url) {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetch = async (dataUrl) => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(url, {
          signal: controller.signal,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          if (
            !error.response?.data?.clientMsg ||
            !error.response?.data?.error
          ) {
            setFetchError("Server offline. Try again later.");
          } else {
            setFetchError(error.response.data.clientMsg);
            console.log(error.response.data.error);
          }
          setData([]);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetch(url);

    const cleanUp = () => {
      isMounted = false;
      controller.abort();
    };

    return cleanUp;
  }, [url]);

  return { data, loading, fetchError };
}

export default useAxiosGetFetch;
