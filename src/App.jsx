import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Plot from "./components/Plot";

function App() {
  const [plotData, setPlotData] = useState({ data: [] });
  const [error, setError] = useState(false);
  const [errorObj, setErrorObj] = useState({});

  return (
    <div className="App">
      <div className="font-roboto">
        <Header />
        <div className="px-20 py-4 xl:px-28">
          <Input
            setPlotData={setPlotData}
            setError={setError}
            setErrorObj={setErrorObj}
          />

          {!error && <Plot plotData={plotData} />}
          {!error && (
            <div className="border border-orange-500 px-2 w-36 ml-auto text-center rounded-lg text-orange-500">
              <div>
                <p>Mean: {plotData.mean}</p>
                <p>Variance: {plotData.var}</p>
              </div>
            </div>
          )}
          {error && (
            <p>
              {errorObj.error.error}, {errorObj.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
