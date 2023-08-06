import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

import { XCircleIcon } from "@heroicons/react/24/outline";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";

function CreateProjectModal({ show, closeModal }) {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [finishCB, setFinishCB] = useState(false);
  const [finish, setFinish] = useState(new Date().toISOString().split("T")[0]);
  const [clientMsg, setClientMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!show) return null;

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={closeModal}
        className="h-screen w-full fixed top-0 backdrop-blur-sm"
      ></div>
      <div className="h-fit w-fit fixed top-20 left-1/2 -translate-x-1/2 z-50 flex justify-center items-start">
        <div className="w-fit min-w-[740px] max-h-full p-6 z-50 bg-custom-gray-base rounded-2xl overflow-y-scroll overflow-x-hidden">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-custom-blue">
              Create new project
            </h1>
            <p
              onClick={closeModal}
              className="text-2xl text-custom-red font-bold hover:cursor-pointer"
            >
              <XCircleIcon className="h-9 w-9" />
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4 py-2">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="name" className="self-start text-xl">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  maxLength="32"
                  required
                  className="w-full h-fit text-left py-2 bg-custom-gray-light rounded-lg focus:ring-0 focus:border-custom-purple"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="shortDesc" className="self-start text-xl">
                  Short description:
                </label>
                <textarea
                  type="text"
                  id="shortDesct"
                  autoComplete="off"
                  onChange={(e) => setShortDesc(e.target.value)}
                  value={shortDesc}
                  maxLength="128"
                  required
                  className="w-full h-fit text-left resize-none py-2 bg-custom-gray-light rounded-lg focus:ring-0 focus:border-custom-purple"
                ></textarea>
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="Description" className="self-start text-xl">
                  Description:
                </label>
                <textarea
                  type="text"
                  id="Description"
                  autoComplete="off"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className="w-full h-fit max-h-80 text-left resize-y py-2 bg-custom-gray-light rounded-lg focus:ring-0 focus:border-custom-purple"
                ></textarea>
              </div>
              <div className="flex flex-nowrap items-center justify-between">
                <div className="flex flex-nowrap gap-x-4 py-2 items-center">
                  <label
                    htmlFor="deadline"
                    className="pl-2 text-lg hover:cursor-pointer"
                  >
                    Set deadline for project?
                  </label>
                  <input
                    id="deadline"
                    type="checkbox"
                    onChange={() => setFinishCB((prev) => !prev)}
                    checked={finishCB}
                    className="h-6 w-6 rounded border-0 bg-slate-700 text-custom-green focus-within:hidden"
                  />
                </div>
                {finishCB && (
                  <input
                    type="date"
                    onChange={(e) =>
                      setFinish(
                        new Date(e.target.value).toISOString().split("T")[0]
                      )
                    }
                    value={finish}
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-slate-700 rounded-xl border-0 outline-none ring-0 focus:ring-custom-purple focus:ring-2"
                  />
                )}
              </div>
              {clientMsg && (
                <p className="w-full text-center py-4 text-xl font-semibold text-custom-green">
                  {clientMsg}
                </p>
              )}
              <div className="w-full text-center py-1">
                <button className="py-3 px-5 rounded-xl bg-slate-700 hover:ring-2 hover:ring-custom-purple text-lg font-bold">
                  Create project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modaldiv")
  );
}

export default CreateProjectModal;
