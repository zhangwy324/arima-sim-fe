import React, { useState, useEffect } from "react";
import DynamicInput from "./DynamicInput";
import SingleInput from "./SingleInput";

export default function Input({ params, setParams, handleSubmit, setRandButtonToggler }) {
  console.log(params);
  // this toggles each time Randomize button is clicked
  // which triggers useEffect which runs the submit function to fetch data
  // I did this so that when user change seed input, it does not trigger a fetch
  // cannot call onSubmit directly inside randSeed as the fetch would not fetch using the updated seed

  // handle add buttons for ar, ma, sar, sma coefficients
  function handleAdd(event) {
    const name = event.target.name;
    setParams((prevParams) => {
      return {
        ...prevParams,
        [name]: [...prevParams[name], "0"],
      };
    });
  }

  // handle input change for ar, ma, sar, sma coefficients
  function handleArrInputChange(event) {
    const value = event.target.value;
    const index = event.target.id;
    const name = event.target.name;
    setParams((prevParams) => {
      let arr = prevParams[name];
      arr[index] = value;
      return {
        ...prevParams,
        [name]: arr,
      };
    });
  }

  // handle delete buttons for ar, ma, sar, sma coefficients
  function handleDelete(event) {
    const name = event.target.name;
    if (params[name].length === 0) {
      return;
    }
    let arr = params[name];
    arr.pop();
    setParams((prevParams) => {
      return {
        ...prevParams,
        [name]: arr,
      };
    });
    if (params.D === "0" && params.sar.length === 0 && params.sma.length === 0) {
      setParams((prevParams) => {
        return {
          ...prevParams,
          S: "",
        };
      });
    }
  }

  // handle input change for d, D, S values
  // the input can only contain integers
  function handleIntChange(event) {
    const { name, value } = event.target;
    const re = /^[0-9\b]+$/;

    if (value === "" || re.test(value)) {
      setParams((prevParams) => {
        return {
          ...prevParams,
          [name]: value,
        };
      });
    }
    if (params.D === "0" && params.sar.length === 0 && params.sma.length === 0) {
      setParams((prevParams) => {
        return {
          ...prevParams,
          S: "",
        };
      });
    }
  }

  return (
    <div className="relative w-60 border-r grow-0 overflow-y-scroll pb-11">
      <div className="flex flex-wrap justify-around my-2 gap-2">
        <DynamicInput
          params={params}
          name="ar"
          handleAdd={handleAdd}
          handleInputChange={handleArrInputChange}
          handleDelete={handleDelete}
        />
        <DynamicInput
          params={params}
          name="ma"
          handleAdd={handleAdd}
          handleInputChange={handleArrInputChange}
          handleDelete={handleDelete}
        />
        <DynamicInput
          params={params}
          name="sar"
          handleAdd={handleAdd}
          handleInputChange={handleArrInputChange}
          handleDelete={handleDelete}
        />
        <DynamicInput
          params={params}
          name="sma"
          handleAdd={handleAdd}
          handleInputChange={handleArrInputChange}
          handleDelete={handleDelete}
        />
      </div>
      {/* <div className="flex flex-wrap justify-around my-2 gap-2">
        <SingleInput
          params={params}
          name="d"
          handleIntChange={handleIntChange}
        />
        <SingleInput
          params={params}
          name="D"
          handleIntChange={handleIntChange}
        />

        <SingleInput
          params={params}
          name="S"
          handleIntChange={handleIntChange}
        />
      </div>

      <div className="flex flex-wrap justify-around my-2 gap-2">
        <SingleInput
          params={params}
          name="n"
          handleIntChange={handleIntChange}
        />
        <SingleInput
          params={params}
          name="burnin"
          handleIntChange={handleIntChange}
        />
        <SingleInput
          params={params}
          name="seed"
          handleIntChange={handleIntChange}
        />
      </div> */}
    </div>
  );

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
}
