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
    <div className={`flex justify-between gap-2 border rounded-md border-orange-300 px-5 w-52 ${isdisable ? "bg-gray-200" : ""}`}>
      <span>{label}: </span>
      <input
        type="text"
        name={name}
        onChange={handleIntChange}
        value={params[name]}
        className={`w-28 text-center`}
        disabled={isdisable}
      />
    </div>
  );
}
