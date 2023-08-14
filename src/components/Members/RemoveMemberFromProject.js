import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import useAxiosGetFetch from "../../hooks/useAxiosGetFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function RemoveMemberFromProject() {
  const { projectname } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [removeMember, setRemoveMember] = useState("");
  const [members, setMembers] = useState([]);
  const [clientMsg, setClientMsg] = useState("");

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/members/${projectname}`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      setMembers(data?.users);
      setRemoveMember(data?.users[0]?._id);
    }
  }, [data]);

  const handleRemoveMember = async () => {
    if (!removeMember && !projectname) return;
    try {
      const response = await axiosPrivate.delete(
        `/members/remove/${projectname}/${removeMember}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setClientMsg(response?.data?.clientMsg);
      setRefetch((prev) => !prev);
    } catch (error) {
      if (!error.response?.data?.clientMsg || !error.response?.data?.error) {
        setClientMsg("Server offline. Try again later.");
      } else {
        setClientMsg(error.response.data.clientMsg);
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientMsg("");
    }, 5000); //5sec
    return () => {
      clearTimeout(timeout);
    };
  }, [clientMsg]);

  return (
    <div className="flex flex-col gap-y-2 py-6">
      <div className="flex flex-row items-center gap-x-6">
        <div>
          {loading ? (
            <Skeleton width={290} height={44} />
          ) : (
            <select
              value={removeMember}
              onChange={(e) => setRemoveMember(e.target.value)}
              className="w-72 font-medium h-fit bg-custom-gray-base py-3 rounded-xl ring-2 ring-zinc-500 focus:ring-2 focus:ring-custom-purple focus:outline-none focus:border-0 outline-none border-0"
            >
              {members.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {(user.isOwner ? "#Owner - " : "") + user.username}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div>
          <div
            onClick={handleRemoveMember}
            className="w-fit h-fit py-2 px-4 text-semibold text-custom-red bg-custom-gray-base rounded-xl font-semibold hover:cursor-pointer"
          >
            Remove
          </div>
        </div>
      </div>
      {clientMsg && <div className="text-lg text-custom-blue">{clientMsg}</div>}
    </div>
  );
}

export default RemoveMemberFromProject;
