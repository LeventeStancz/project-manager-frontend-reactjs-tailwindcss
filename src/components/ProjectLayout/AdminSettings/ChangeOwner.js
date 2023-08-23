import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import SearchSelector from "../../Special/SearchSelector";

import useAxiosGetFetch from "../../../hooks/useAxiosGetFetch";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ChangeOwner() {
  const { projectname } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [owner, setOwner] = useState("");
  const [newOwnerId, setNewOwnerId] = useState("");
  const [users, setUsers] = useState([]);
  const [searctInput, setSearchInput] = useState("");
  const [clientMsg, setClientMsg] = useState("");

  const { data: usersData, fetchError: usersFetchError } = useAxiosGetFetch(
    `/users/search/${searctInput ? searctInput : undefined}/true`
  );

  useEffect(() => {
    if (!usersFetchError && usersData != null) {
      const formattedUsers = usersData?.users.map((user) => {
        return {
          ...user,
          name: user.username,
        };
      });
      setUsers(formattedUsers);
    }
  }, [usersData]);

  const {
    data: ownerData,
    loading: ownerLoading,
    fetchError: ownerFetchError,
    setRefetch: ownerSetRefetch,
  } = useAxiosGetFetch(`/projects/owner/${projectname}`);

  useEffect(() => {
    if (!ownerFetchError && ownerData != null) {
      setOwner(ownerData.owner);
    }
  }, [ownerData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientMsg("");
    }, 5000); //5sec
    return () => {
      clearTimeout(timeout);
    };
  }, [clientMsg]);

  const handleClick = async () => {
    if (!newOwnerId || !owner || owner._id.toString() === newOwnerId.toString())
      return;

    try {
      const response = await axiosPrivate.put(
        `/projects/update/owner/${projectname}`,
        JSON.stringify({
          newOwner: newOwnerId,
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
      ownerSetRefetch((prev) => !prev);
    }
  };

  return (
    <div className="w-1/2 mb-10">
      <div className="flex flex-col gap-y-4 py-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-nowrap justify-between items-center py-4">
            <label htmlFor="name" className="text-xl font-semibold">
              Current owner:
            </label>
            <div className="flex flex-col items-center">
              {ownerLoading ? (
                <>
                  <Skeleton width={60} height={18} />
                  <Skeleton width={200} height={18} />
                </>
              ) : (
                <>
                  <h2 className="text-xl">{owner?.username || "username"}</h2>
                  <h2 className="text-custom-gray-bright text-lg">
                    {owner?.email || "email address"}
                  </h2>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-nowrap justify-between items-center">
            <SearchSelector
              inputValue={searctInput}
              setInputValue={setSearchInput}
              setSelectedId={setNewOwnerId}
              data={users}
              placeholder={"Select user"}
              inputPlaceholder={"Search by username..."}
            />
            <div className="text-center">
              <button
                onClick={handleClick}
                className="py-2 px-4 rounded-xl bg-custom-gray-base text-custom-yellow-base text-lg font-semibold"
              >
                Update project owner
              </button>
            </div>
          </div>
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

export default ChangeOwner;
