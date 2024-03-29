import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

function useAxiosGetFetch(url) {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetch = async (dataUrl) => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(dataUrl, {
          signal: controller.signal,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setStatus(error.response.status);
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
  }, [url, refetch]);

  return { data, loading, fetchError, setRefetch, status };
}

export default useAxiosGetFetch;
