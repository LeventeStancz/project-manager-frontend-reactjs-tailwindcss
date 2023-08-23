import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import useAxiosGetFetch from "../../../hooks/useAxiosGetFetch";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ChangeActiveStatus() {
  const { projectname } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [activeStatus, setActiveStatus] = useState();
  const [newStatus, setNewStatus] = useState();
  const [clientMsg, setClientMsg] = useState("");

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/projects/isActive/${projectname}`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setActiveStatus(data.isActive);
      setNewStatus(!data.isActive);
    }
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientMsg("");
    }, 5000); //5sec
    return () => {
      clearTimeout(timeout);
    };
  }, [clientMsg]);

  const handleClick = async () => {
    if (
      typeof newStatus === "undefined" ||
      typeof activeStatus === "undefined" ||
      newStatus === activeStatus
    )
      return;

    try {
      const response = await axiosPrivate.put(
        `/projects/update/isActive/${projectname}`,
        JSON.stringify({
          newStatus,
        })
      );

      setClientMsg(response?.data?.clientMsg);
    } catch (error) {
      if (!error.response?.data?.clientMsg || !error.response?.data?.error) {
        setClientMsg("Server offline. Try again later.");
      } else {
        setClientMsg(error.response.data.clientMsg);
        console.log(error.response.data.error);
      }
    } finally {
      setRefetch((prev) => !prev);
    }
  };

  return (
    <div className="w-1/2">
      <div className="flex flex-col gap-y-4 py-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-nowrap justify-between items-center py-4">
            <label htmlFor="name" className="text-xl font-semibold">
              Current:
            </label>
            <h2
              className={`text-xl font-bold underline ${
                activeStatus ? "text-custom-green" : "text-custom-red"
              }`}
            >
              {activeStatus ? "Active" : "Inactive"}
            </h2>
          </div>
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleClick}
            className="py-2 px-4 rounded-xl bg-custom-gray-base text-custom-yellow-base text-lg font-semibold"
          >
            Update projects status to:
            {
              <p className="underline font-bold">
                {newStatus ? "Active" : "Inactive"}
              </p>
            }
          </button>
        </div>
        {clientMsg && (
          <p className="w-full text-center py-4 text-xl font-semibold text-custom-green">
            {clientMsg}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChangeActiveStatus;
