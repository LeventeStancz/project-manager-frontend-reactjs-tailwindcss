import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//username regex --> can only contain:
//lower/uppercase letter, 0-9 numbers, hyphens, underscores
const USERNAME_REGEX = /^[a-zA-Z0-9-_]{4,16}$/;
//password regex --> must contain at least one:
//lowercase letter, uppercase letter, number between 0-9
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,32}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Register() {
  //focus to first input (username field)
  const inputRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //component loads, setting focus to input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //validating username when it changes
  useEffect(() => {
    const res = USERNAME_REGEX.test(username);
    setValidUsername(res);
  }, [username]);

  //validating password when it changes
  useEffect(() => {
    const res = PASS_REGEX.test(password);
    setValidPass(res);
  }, [password]);

  //validating email when it changes
  useEffect(() => {
    const res = EMAIL_REGEX.test(email);
    setValidEmail(res);
  }, [email]);

  //reset error message
  useEffect(() => {
    setErrorMsg("");
  }, [username, password, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <main className="w-full h-screen flex flex-col justify-start items-center mt-10">
      <section className="w-1/5 h-fit p-4 rounded-xl bg-zinc-800">
        <div className="w-full h-full flex flex-col">
          <h1 className="w-full pb-4 text-center text-3xl font-bold text-custom-orange">
            OTCGD
          </h1>
          <form
            onSubmit={handleSubmit}
            className={
              success ? "hidden" : "w-full flex flex-col items-start space-y-3"
            }
          >
            <label htmlFor="username" className="self-start text-xl">
              Username:
            </label>
            <input
              type="text"
              id="username"
              ref={inputRef}
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength="16"
              required
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby="usernamenote"
              onBlur={() => setUsernameFocus(false)}
              onFocus={() => setUsernameFocus(true)}
              className="w-full h-fit text-center py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
            />
            <p
              id="usernamenote"
              className={
                usernameFocus && username && !validUsername
                  ? "w-full text-left text-lg text-zinc-400"
                  : "hidden"
              }
            >
              4 to 16 characters long.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="email" className="self-start text-xl">
              Email address:
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength="128"
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onBlur={() => setEmailFocus(false)}
              onFocus={() => setEmailFocus(true)}
              className="w-full h-fit text-center py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "w-full text-left text-lg text-zinc-400"
                  : "hidden"
              }
            >
              format: examle@domain.TLD (TLD: .com, .org, etc.)
              <br />
            </p>

            <label htmlFor="password" className="self-start text-xl">
              Password:
            </label>
            <div className="w-full relative">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength="32"
                required
                aria-invalid={validPass ? "false" : "true"}
                aria-describedby="passwordnote"
                onBlur={() => setPasswordFocus(false)}
                onFocus={() => setPasswordFocus(true)}
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
            <p
              id="passwordnote"
              className={
                passwordFocus && !validPass
                  ? "w-full text-left text-lg text-zinc-400"
                  : "hidden"
              }
            >
              6 to 32 characters long.
              <br />
              Must contain at least one of:
              <br />
              Lowercase letter, Uppercase letter, Number between 0-9
            </p>

            <h2
              className={
                errorMsg
                  ? "w-full text-center text-xl text-custom-red"
                  : "hidden"
              }
            >
              {errorMsg}
            </h2>

            <div className="w-full flex justify-center py-3">
              <button
                disabled={
                  !validUsername || !validEmail || !validPass ? true : false
                }
                className="py-3 px-5 rounded-xl bg-custom-purple text-black text-lg font-bold disabled:opacity-20"
              >
                Register
              </button>
            </div>
          </form>
          <div className="w-full text-center">
            <Link to="/login">
              <span className="text-lg text-custom-blue underline hover:cursor-pointer">
                Login
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
