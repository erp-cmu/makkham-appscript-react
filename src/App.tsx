import { useState, useEffect } from "react";
import { useData } from "./hooks/useData";
function App() {
  const { data, isLoading, error } = useData();
  // useEffect(() => {
  //   google.script.run
  //     .withSuccessHandler((result: string) => {
  //       setResult(result);
  //       console.log({ result });
  //     })
  //     .getAllSheetsData();
  // }, []);
  return (
    <>
      <h1>My Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
