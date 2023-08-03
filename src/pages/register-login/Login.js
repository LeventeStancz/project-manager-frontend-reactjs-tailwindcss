import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../../services/axios";

function Login() {
  //store global auth state in the context
  const { setAuth, trustedDevice, setTrustedDevice } = {};

  //take the user back to where they got logged out after a successful login
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //focus to first input (username field)
  const inputRef = useRef();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [clientMsg, setClientMsg] = useState("");

  //component loads, setting focus to input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //reset error message
  useEffect(() => {
    setErrorMsg("");
  }, [user, pass]);

  const toggleTrustedDevice = () => {
    setTrustedDevice((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("trustedDevice", trustedDevice);
  }, [trustedDevice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({
          username: user,
          password: pass,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { accessToken } = response?.data;

      //setAuth({ accessToken });
      //clear inputs
      setUser("");
      setPass("");
      setClientMsg(response?.data?.clientMsg);
      setTimeout(() => {
        //navigate
        navigate(from, { replace: true });
      }, 2000); //2 sec
    } catch (error) {
      if (!error.response?.data?.clientMsg || !error.response?.data?.error) {
        setErrorMsg("Server offline. Try again later.");
      } else {
        setErrorMsg(error.response.data.clientMsg);
        console.log(error.response.data.error);
      }
    }
  };
  return (
    <main className="w-full h-screen flex flex-col justify-start items-center mt-10">
      <section className="w-1/4 h-fit p-4 rounded-xl bg-zinc-800">
        <div className="w-full h-full flex flex-col">
          <h1 className="w-full pb-4 text-center text-3xl font-bold text-custom-orange">
            OTCGD
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-start space-y-3"
          >
            <label htmlFor="username" className="self-start text-xl">
              Username:
            </label>
            <input
              type="text"
              id="username"
              ref={inputRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              maxLength="16"
              required
              className="w-full h-fit text-center py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
            />
            <label htmlFor="password" className="self-start text-xl">
              Password:
            </label>
            <div className="w-full relative">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                maxLength="32"
                required
                className="w-full h-fit text-center py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={() => setShowPass((old) => !old)}
                className={
                  (!showPass
                    ? "w-6 h-6 absolute top-2 right-2 hover:cursor-pointer"
                    : "hidden") + " text-custom-purple"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={() => setShowPass((old) => !old)}
                className={
                  (showPass
                    ? "w-6 h-6 absolute top-2 right-2 hover:cursor-pointer"
                    : "hidden") + " text-custom-purple"
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </div>

            <div className="w-full flex flex-row justify-between items-center py-2">
              <div className="w-fit flex items-center">
                <input
                  id="trustedDevice"
                  type="checkbox"
                  onChange={toggleTrustedDevice}
                  checked={trustedDevice}
                  className="h-5 w-5 rounded border-0 bg-slate-600 text-custom-green focus-within:hidden"
                />
                <label
                  htmlFor="trustedDevice"
                  className="pl-2 hover:cursor-pointer"
                >
                  Trust this device
                </label>
              </div>
              {/* link to /forgotpassword */}
              <p className="text-custom-blue underline">Forgot pass</p>
            </div>

            <h2
              className={
                errorMsg
                  ? "w-full text-center text-xl text-custom-red"
                  : "hidden"
              }
            >
              {errorMsg}
            </h2>
            <h2
              className={
                clientMsg
                  ? "w-full text-center text-xl text-custom-green"
                  : "hidden"
              }
            >
              {clientMsg}
            </h2>

            <div className="w-full flex justify-center py-3">
              <button className="py-2 px-5 rounded-xl bg-custom-purple text-black text-lg font-bold">
                Login
              </button>
            </div>
          </form>
          <div className="w-full text-center">
            <Link to="/register">
              <span className="text-lg text-custom-blue underline hover:cursor-pointer">
                Register
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
