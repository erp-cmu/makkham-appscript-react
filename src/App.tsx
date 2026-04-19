import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  useEffect(() => {
    google.script.run
      .withSuccessHandler((result: string) => {
        setResult(result);
        console.log({ result });
      })
      .getAllSheetsData();
  }, []);
  return (
    <>
      <h1>My Dashboard</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
}

export default App;
