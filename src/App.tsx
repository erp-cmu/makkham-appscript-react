import { useState, useEffect } from "react";
import { useData } from "./hooks/useData";
import * as aq from "arquero";
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
  useEffect(() => {
    const dt = aq.table({
      city: ["Seattle", "Chicago", "San Francisco"],
      sun_hours: [157, 120, 205],
    });

    // 2. Transform the data: Filter and Derive
    const result = dt
      .derive({ sun_hours: (d) => d.sun_hours + 10 }) // Add 10 to sun hours
      .filter((d) => d.sun_hours > 150); // Keep only if > 150

    // 3. Print the resulting table
    result.print();
  }, []);
  return (
    <>
      <h1>My Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
