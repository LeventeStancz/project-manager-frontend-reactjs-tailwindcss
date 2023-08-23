import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ChangeActiveStatus({ projectData = {} }) {
  const axiosPrivate = useAxiosPrivate();
  const [activeStatus, setActiveStatus] = useState(projectData.isActive);
  const [clientMsg, setClientMsg] = useState("");

  return (
    <div className="w-1/2">
      <div className="flex flex-col gap-y-4 py-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-nowrap justify-between items-center py-4">
            <label htmlFor="name" className="text-xl font-semibold">
              Current:
            </label>
            <h2 className="text-xl">{activeStatus ? "Active" : "Inactive"}</h2>
          </div>
          <input
            type="text"
            id="name"
            autoComplete="off"
            onChange={(e) => setActiveStatus(e.target.value)}
            value={activeStatus}
            maxLength="32"
            required
            className="w-full h-fit text-center py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple"
          />
        </div>
        {clientMsg && (
          <p className="w-full text-center py-4 text-xl font-semibold text-custom-green">
            {clientMsg}
          </p>
        )}
        <div className="w-full text-center">
          <button className="py-2 px-4 rounded-xl bg-custom-gray-base text-custom-yellow-base text-lg font-semibold">
            Update projects active status
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeActiveStatus;
