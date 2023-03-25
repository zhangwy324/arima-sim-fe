import React from "react";

export default function SingleInput({ params, name, handleIntChange }) {
  let isdisable = false;
  if (name === "S" && params.sar.length === 0 && params.sma.length === 0 && params.D === "0") {
    isdisable = true;
  }
  let label;
  switch (name) {
    case "n":
      label = "length";
      break;

    default:
      label = name;
      break;
  }
  return (
    <div className="basis-[33%] flex justify-center">
      <div className={`relative inline-block rounded border w-52 ${isdisable ? "bg-gray-400" : ""}`}>
        <input
          type="text"
          name={name}
          onChange={handleIntChange}
          value={params[name]}
          className={`w-full h-8 flex items-center rounded text-base indent-24 outline-none text-ellipsis`}
          disabled={isdisable}
        />
        <label className="h-8 flex items-center px-6 absolute top-0 left-0 bottom-0 text-base rounded-l">{label}: </label>
      </div>
    </div>
  );
}
