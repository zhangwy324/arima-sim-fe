import React from "react";

export default function DynamicInput({ params, name, handleAdd, handleInputChange, handleDelete }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="border bg-orange-300 rounded-full p-2 w-44 text-center">
        <span>
          {name} coefficients:{" "}
          <button
            onClick={handleAdd}
            name={name}
            className="bg-white px-2 rounded-full h-7 w-7 hover:bg-orange-300 hover:text-white hover:border-white hover: border"
          >
            +
          </button>
        </span>
      </div>

      {params[name].map((param, index) => {
        return (
          <div
            className="border border-orange-300 rounded-md flex justify-evenly"
            key={index}
          >
            <label>
              {name}
              {index + 1}:
            </label>
            <input
              id={index}
              type="number"
              name={name}
              onChange={handleInputChange}
              value={params[name][index]}
              className="text-center w-16"
            />
          </div>
        );
      })}
      {params[name].length > 0 && (
        <button
          onClick={handleDelete}
          name={name}
          className="mx-auto bg-orange-400 px-2 rounded-full h-7 w-7 hover:bg-orange-100 hover:text-orange-700 "
        >
          -
        </button>
      )}
    </div>
  );
}
