import React from "react";

export default function SingleInput({ params, name, handleIntChange }) {
  let isdisable = false;
  if (name === "S" && params.sar.length === 0 && params.sma.length === 0 && params.D === "0") {
    isdisable = true;
  }
  let label;
  switch (name) {
    case "d":
      label = "Difference order"
      break;
    case "D":
      label = "Seasonal diff."
      break;
    case "S":
      label = "Seasonal period"
      break;
    case "n":
      label = "Series length";
      name = "n"
      break;
    default:
      label = name;
      break;
  }
  return (
    <div className="basis-[33%] grow flex justify-center">
      <div className="w-full px-2">
        <label className="block mb-0.5 text-sm text-gray-900">{name}:</label>
        <input
          type="text"
          name={name}
          onChange={handleIntChange}
          value={params[name]}
          disabled={isdisable}
          placeholder={isdisable ? "No seasonal params" : label}
          className={`outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm overflow-ellipsis rounded-lg block w-full p-2.5 ${isdisable ? "cursor-not-allowed" : ""} `}
        />
      </div>
      {/* <div className={`relative inline-block rounded border w-52 ${isdisable ? "bg-gray-400" : ""}`}>
        <input
          type="text"
          name={name}
          onChange={handleIntChange}
          value={params[name]}
          className={`w-full h-8 flex items-center rounded text-base indent-24 outline-none text-ellipsis`}
          disabled={isdisable}
        />
        <label className="h-8 flex items-center px-6 absolute top-0 left-0 bottom-0 text-base rounded-l">{label}: </label>
      </div> */}
    </div>
  );
}
