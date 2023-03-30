import React from "react";

export default function DynamicInput({ params, name, handleAdd, handleInputChange, handleDelete }) {
  return (
    <div className="flex flex-col border-b border-gray-900 w-full">
      <div className="flex border-b">
        <div className="w-12 text-center font-black text-3xl flex items-center justify-center bg-gray-300 "> • </div>
        <div className="grow text-center p-2">
          <span>
            {name} coefficients:{" "}
            <button
              onClick={handleDelete}
              name={name}
              className="bg-white px-2 rounded-full h-7 w-7 hover:bg-gray-300 font-extrabold hover:text-white hover:border-white hover: border "
            >
              -
            </button>
          </span>
        </div>
      </div>

      {params[name].map((param, index) => {
        return (
          <div
            className="flex border-b"
            key={index}
          >
            <div className="w-12 text-center text-sm flex items-center justify-center bg-gray-300">
              <div>
                {name}
                <sub>{index + 1}</sub>:
              </div>
            </div>
            <div className="grow text-center py-2">
              <input
                id={index}
                type="number"
                name={name}
                onChange={handleInputChange}
                value={params[name][index]}
                className="w-48 indent-2 "
              />
            </div>
          </div>
        );
      })}
      {/* {params[name].length > 0 && (
        <button
          onClick={handleDelete}
          name={name}
          className="mx-auto bg-orange-400 px-2 rounded-full h-7 w-7 hover:bg-orange-100 hover:text-orange-700 "
        >
          -
        </button>
      )} */}
      <div className="flex">
        <div className="w-12 text-center flex items-center justify-center bg-gray-300 ">
          <button
            onClick={handleAdd}
            name={name}
            className=" text-center border border-white rounded-full h-5 w-5 flex items-center justify-center hover:bg-white"
          >
            +
          </button>{" "}
        </div>
        <div
          onClick={(e) => handleAdd(e, name)}
          className="grow text-start p-2 cursor-pointer "
        >
          <span className="text-gray-400 ">Add... </span>
        </div>
      </div>
    </div>
  );
}
