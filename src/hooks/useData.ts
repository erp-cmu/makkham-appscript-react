import { useQuery } from "@tanstack/react-query";
import { allData } from "../data-mock/all";
function fetchData() {
  if (window.location.hostname === "localhost") {
    // Logic for local development
    console.log("Running in local development mode");
    return Promise.resolve(allData);
  } else {
    // Logic for production environment (Google Apps Script)
    console.log("Running in production mode");
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler((result: string) => resolve(result))
        .withFailureHandler((error: unknown) => reject(error))
        .getAllSheetsData();
    });
  }
}

export function useData() {
  const query = useQuery({
    queryKey: ["sheetsData"],
    queryFn: fetchData,
  });
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
