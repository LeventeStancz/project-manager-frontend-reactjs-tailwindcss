import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchSelector from "../Special/SearchSelector";

import useAxiosGetFetch from "../../hooks/useAxiosGetFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AddMemberToProject() {
  const { projectname } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [addUser, setAddUser] = useState("");
  const [users, setUsers] = useState([]);
  const [searctInput, setSearchInput] = useState("");
  const [clientMsg, setClientMsg] = useState("");

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(
    `/users/search/${searctInput ? searctInput : undefined}/true`
  );

  useEffect(() => {
    if (!fetchError && data != null) {
      const formattedUsers = data?.users.map((user) => {
        return {
          ...user,
          name: user.username,
        };
      });
      setUsers(formattedUsers);
    }
  }, [data]);

  const handleAddMember = async () => {
    if (!addUser && !projectname) return;
    try {
      const response = await axiosPrivate.post(
        `/members/add/${projectname}`,
        JSON.stringify({
          memberid: addUser,
        })
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
      <div className="flex flex-row gap-x-10">
        <div>
          <SearchSelector
            inputValue={searctInput}
            setInputValue={setSearchInput}
            setSelectedId={setAddUser}
            data={users}
            placeholder={"Select user"}
            inputPlaceholder={"Search by username..."}
          />
        </div>
        <div>
          <div
            onClick={handleAddMember}
            className="w-fit h-fit py-2 px-4 text-semibold text-custom-green bg-custom-gray-base rounded-xl font-semibold hover:cursor-pointer"
          >
            Add
          </div>
        </div>
      </div>
      {clientMsg && <div className="text-lg text-custom-blue">{clientMsg}</div>}
    </div>
  );
}

export default AddMemberToProject;
