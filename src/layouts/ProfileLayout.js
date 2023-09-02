import { useState, useEffect } from "react";
import EditableTextInput from "../components/Inputs/EditableTextInput";

import useAxiosGetFetch from "../hooks/useAxiosGetFetch";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

//username regex --> can only contain:
//lower/uppercase letter, 0-9 numbers, hyphens, underscores
const USERNAME_REGEX = /^[a-zA-Z0-9-_]{4,16}$/;

function ProfileLayout() {
  const axiosPrivate = useAxiosPrivate();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [userEdit, setUserEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState("Unknown");
  const [errorMsg, setErrorMsg] = useState("");
  const [clientMsg, setClientMsg] = useState("");

  const { data, loading, fetchError, setRefetch } = useAxiosGetFetch(`/users`);

  useEffect(() => {
    if (!fetchError && data != null) {
      setUsername(data.user.username);
      setEmail(data.user.email);
      setRegistered(data.user.createdAt);
    }
  }, [data]);

  //validating username when it changes
  useEffect(() => {
    const res = USERNAME_REGEX.test(username);
    setValidUsername(res);
  }, [username]);

  //reset error message
  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMsg("");
    }, 5000); //5sec

    return () => {
      clearTimeout(timeout);
    };
  }, [errorMsg]);

  //reset clientMsg
  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientMsg("");
    }, 5000); //5sec

    return () => {
      clearTimeout(timeout);
    };
  }, [clientMsg]);

  const handleUpdate = async () => {
    if (!validUsername || !username) return;
    try {
      const response = await axiosPrivate.patch(
        `/users/update/username`,
        JSON.stringify({
          username: username,
        })
      );

      setClientMsg(response?.data?.clientMsg);
      setUsername("");
      setValidUsername(true);
      setUserEditing(false);
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

  return (
    <section className="w-full h-full flex flex-col p-5">
      <div className="w-full py-3">
        <h1 className="leading-none text-5xl font-semibold text-custom-orange">
          Profile page
        </h1>
      </div>
      <section className="w-full h-fit flex flex-col items-center py-4">
        <div className="w-2/5 flex flex-col justify-center gap-y-4">
          <div>
            <EditableTextInput
              title="Username:"
              value={username}
              setValue={setUsername}
              editing={userEdit}
              setEditing={setUserEditing}
            />
            <p
              id="usernamenote"
              className={
                username && !validUsername
                  ? "w-full text-left text-lg text-zinc-400"
                  : "hidden"
              }
            >
              4 to 16 characters long.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          {clientMsg && (
            <div className="flex justify-center text-custom-green text-xl font-semibold">
              {clientMsg}
            </div>
          )}
          {errorMsg && (
            <div className="flex justify-center text-custom-red text-xl font-semibold">
              {errorMsg}
            </div>
          )}
          {userEdit && (
            <div className="w-full flex justify-evenly">
              <div className="flex justify-center py-3">
                <button
                  onClick={() => {
                    setUsername("");
                    setValidUsername(true);
                    setUserEditing(false);
                    setRefetch((prev) => !prev);
                  }}
                  className="py-2 px-5 rounded-xl bg-custom-red text-black text-lg font-bold"
                >
                  Cancel
                </button>
              </div>
              <div className="flex justify-center py-3">
                <button
                  onClick={handleUpdate}
                  className="py-2 px-5 rounded-xl bg-custom-green text-black text-lg font-bold"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <div className="w-full flex flex-col gap-y-2">
            <h2 className="self-start text-2xl font-semibold">
              Email address:
            </h2>
            <p className="underline text-gray-400 text-xl">{email}</p>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <h2 className="self-start text-2xl font-semibold">
              Registered on website:
            </h2>
            <p className="text-custom-blue text-xl font-semibold">
              {registered}
            </p>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <h2 className="self-start text-2xl font-semibold">
              Change password:
            </h2>
            <p className="self-center rounded-xl cursor-pointer underline w-fit py-2 px-4 bg-custom-gray-base text-custom-blue text-xl font-semibold">
              Go to change password
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ProfileLayout;
