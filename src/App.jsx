import { useEffect, useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Plot from "./components/Plot";
import SingleInput from "./components/SingleInput";

function App() {
  const [plotData, setPlotData] = useState({ data: [] });
  const [error, setError] = useState(false);
  const [errorObj, setErrorObj] = useState({});
  const [isFetched, setIsFetched] = useState(false);
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

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
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

  // handle the plot button
  // calls the backend with the params in the state
  function handleSubmit() {
    console.log("fetching");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify(params);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
    };
    let serverURL;
    if (import.meta.env.MODE === "development") {
      serverURL = "http://127.0.0.1:4000/sarima";
    } else if (import.meta.env.MODE === "production") {
      serverURL = "https://arima-sim-be-production.up.railway.app/sarima";
    }
    fetch(serverURL, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsFetched(true);
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
        // this runs when server is down
        setError(true);
        setErrorObj({ error: ["The server is down"] });
        setPlotData({ data: [] });
      });
  }

  useEffect(() => {
    handleSubmit();
  }, [randButtonToggler]);

  return (
    <div className="App">
      <div className="font-roboto  absolute inset-0 flex flex-col overflow-hidden ">
        <Header />
        {!isFetched && <div className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">Loading...</div>}
        {isFetched && (
          <div className="flex justify-between h-full w-full">
            <Input
              params={params}
              setParams={setParams}
              handleSubmit={handleSubmit}
              setRandButtonToggler={setRandButtonToggler}
            />
            <div className=" grow basis-0 flex flex-col overflow-x-hidden overflow-y-scroll justify-start pt-1 px-1 pb-14">
              <h3 className="font-roboto text-xl text-center w-full self-stretch">
                SARIMA({params.ar.length}, {params.d === "" ? 0 : params.d}, {params.ma.length}) x ({params.sar.length}, {params.D === "" ? 0 : params.D}, {params.sma.length})<sub>{params.S === "" ? 0 : params.S}</sub>
              </h3>
              <div className="flex items-center justify-between self-stretch">
                <button
                  onClick={randSeed}
                  className="border border-orange-400 rounded-xl px-4 text-orange-400 hover:bg-orange-400 hover:text-white"
                >
                  Randomize
                </button>
                <button
                  onClick={handleSubmit}
                  className="text-3xl block border border-orange-400 rounded-xl px-4 text-orange-400 hover:bg-orange-400 hover:text-white"
                >
                  Plot Time Series
                </button>
                <div className="border border-orange-500 px-2 w-44 text-center rounded-lg text-orange-500">
                  <div>
                    <p>Mean: {plotData.mean}</p>
                    <p>Variance: {plotData.var}</p>
                  </div>
                </div>
              </div>

              {!error && <Plot plotData={plotData} />}
              <SingleInputGroup
                params={params}
                setParams={setParams}
              />
              {error && <p>{errorObj.error[0]}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SingleInputGroup({ params, setParams }) {
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
    <div className="flex flex-wrap justify-evenly gap-0.5">
      <SingleInput
        params={params}
        name="d"
        handleIntChange={handleIntChange}
        className=""
      />
      <SingleInput
        params={params}
        name="D"
        handleIntChange={handleIntChange}
        className=""
      />

      <SingleInput
        params={params}
        name="S"
        handleIntChange={handleIntChange}
        className=""
      />
      <SingleInput
        params={params}
        name="n"
        handleIntChange={handleIntChange}
        className=""
      />
      <SingleInput
        params={params}
        name="burnin"
        handleIntChange={handleIntChange}
        className=""
      />
      <SingleInput
        params={params}
        name="seed"
        handleIntChange={handleIntChange}
        className=""
      />
    </div>
  );
}

export default App;
