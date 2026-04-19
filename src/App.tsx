import { useGoogleSheetData } from "./hooks/useGoogleSheetData";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator_modern.min.css";
import { ReactTabulator } from "react-tabulator";
function App() {
  const { data, isLoading, error } = useGoogleSheetData();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  const dataTable = data["bnn_dried_bag"].objects();
  console.log(dataTable);
  const columns = Object.keys(dataTable[0]).map((key) => ({
    title: key,
    field: key,
  }));
  return (
    <>
      <h1>Dashboard</h1>
      {/* <pre>{JSON.stringify(data, null, "2)}</pre> */}
      <ReactTabulator
        data={dataTable}
        columns={columns}
        options={{ layout: "fitColumns" }}
      />
    </>
  );
}

export default App;
