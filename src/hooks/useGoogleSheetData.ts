import { useQuery } from "@tanstack/react-query";
import { serverRawData, type ServerRawData } from "../data-mock/raw";
import { sheetNames, type SheetNames } from "../constants/sheets";
import * as aq from "arquero";

function fetchData(): Promise<ServerRawData> {
  if (window.location.hostname === "localhost") {
    // Logic for local development
    console.log("Running in local development mod`e");
    return Promise.resolve(serverRawData);
  } else {
    // Logic for production environment (Google Apps Script)
    console.log("Running in production mode");
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler((result: ServerRawData) => resolve(result))
        .withFailureHandler((error: unknown) => reject(error))
        .getAllSheetsData();
    });
  }
}

function transformToObjArray(data: ServerRawData, sheet: SheetNames) {
  const headers = data[sheet].headers as any[];
  const rows = data[sheet].rows as any[];
  const objArr = rows.map((valArr) => {
    const obj = {} as Record<string, any>;
    headers.forEach((header: string, idx) => {
      obj[header] = valArr[idx];
    });
    return obj;
  });
  return objArr;
}

export function useGoogleSheetData() {
  const query = useQuery({
    queryKey: ["sheetsData"],
    queryFn: fetchData,
  });

  if (query.data) {
    const dtObj = {} as Record<SheetNames, aq.Table>;
    sheetNames.forEach((sheet) => {
      const d = transformToObjArray(query.data, sheet);
      const dt = aq.from(d);
      dtObj[sheet] = dt;
    });

    // Object.entries(dtObj).forEach((s) => s[1].print());
    console.log(dtObj);
    return {
      data: dtObj,
      isLoading: query.isLoading,
      error: query.error,
    };
  }
  return {
    data: null,
    isLoading: query.isLoading,
    error: query.error,
  };
}
