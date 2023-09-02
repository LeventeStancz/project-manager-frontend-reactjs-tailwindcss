import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function EditableTextInput({
  value,
  setValue,
  title,
  maxLength = 16,
  editing,
  setEditing,
}) {
  return (
    <div className="w-full py-4 flex flex-col gap-y-2">
      <label htmlFor="input" className="self-start text-2xl font-semibold">
        {title}
      </label>
      <div className="flex items-center gap-x-4">
        <input
          type="text"
          id="input"
          autoComplete="off"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          maxLength={maxLength}
          required
          disabled={!editing}
          className="w-full h-fit px-4 py-2 bg-zinc-800 rounded-lg focus:ring-0 focus:border-custom-purple disabled:bg-zinc-900"
        />
        <PencilSquareIcon
          onClick={() => setEditing((prev) => !prev)}
          className="w-12 h-12 p-0 m-0 text-custom-yellow-base cursor-pointer"
        />
      </div>
    </div>
  );
}

export default EditableTextInput;
