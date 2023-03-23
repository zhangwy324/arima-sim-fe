import React, { useState, useEffect } from "react";
import DynamicInput from "./DynamicInput";
import SingleInput from "./SingleInput";

export default function Input({ setPlotData, setError, setErrorObj }) {
  // this toggles each time Randomize button is clicked
  // which triggers useEffect which runs the submit function to fetch data
  // I did this so that when user change seed input, it does not trigger a fetch
  // cannot call onSubmit directly inside randSeed as the fetch would not fetch using the updated seed
  const [randButtonToggler, setRandButtonToggler] = useState(false);
  const [params, setParams] = useState({
    ar: [],
    d: "0",
    ma: [],
    sar: [],
    D: "0",
    sma: [],
    S: "",
    n: "100",
    seed: "100",
    burnin: "50",
  });

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

  function randSeed() {
    const rnum = getRandomIntInclusive(-2147483647, 2147483647);
    setParams((prevParams) => {
      return {
        ...prevParams,
        seed: `${rnum}`,
      };
    });
    setRandButtonToggler((prev) => !prev);
  }

  useEffect(() => {
    handleSubmit();
  }, [randButtonToggler]);

  // handle the plot button
  // calls the backend with the params in the state
  function handleSubmit() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify(params);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
    };

    fetch("https://arima-sim-be-production.up.railway.app/sarima", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("DATA:", data);
        if (data.hasOwnProperty("error")) {
          setError(true);
          setPlotData({ data: [] });
          setErrorObj(data);
        } else {
          setError(false);
          setPlotData(data);
        }
      })
      .catch((err) => {
        // currently this never runs
        setPlotData({ data: [] });
        setError(true);
        console.log("ERR:", err);
      });
  }

  return (
    <div className="relative pb-6">
      <h3 className="text-center font-roboto text-2xl pt-8">
        SARIMA(p={params.ar.length}, d={params.d === "" ? 0 : params.d}, q={params.ma.length}) x (P={params.sar.length}, D={params.D === "" ? 0 : params.D}, Q={params.sma.length})<sub>period={params.S === "" ? 0 : params.S}</sub>
      </h3>
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
      <div className="flex flex-wrap justify-around my-2 gap-2">
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
        <button
          onClick={randSeed}
          className="absolute bottom-0 right-0 m-0 border border-orange-400 rounded-xl px-4 text-orange-400 hover:bg-orange-400 hover:text-white"
        >
          Randomize
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="text-3xl mx-auto block border border-orange-400 rounded-xl px-4 text-orange-400 hover:bg-orange-400 hover:text-white my-2"
      >
        Plot Time Series
      </button>
    </div>
  );

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
}
