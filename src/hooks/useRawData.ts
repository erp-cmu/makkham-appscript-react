import { useQuery } from '@tanstack/react-query';
import * as aq from 'arquero';

import { type SheetNames, sheetNames } from '../constants/sheets';
import { type ServerRawData, serverRawData } from '../dataMock/raw';

export function useRawData() {
  const query = useQuery<
    ServerRawData,
    Error,
    Record<SheetNames, aq.ColumnTable>
  >({
    queryKey: ['sheetsData'],
    queryFn: fetchData,
    select: (data: ServerRawData) => {
      const dtObj = {} as Record<SheetNames, aq.ColumnTable>;
      sheetNames.forEach((sheet) => {
        const d = transformToObjArray(data, sheet);
        const dt = aq.from(d);
        // Change column to be unique
        const colsChange = {} as Record<string, string>;
        dt.columnNames().forEach((col) => {
          colsChange[col] = `[${sheet}]_${col}`;
        });
        const dtRenamed = dt.rename(colsChange);
        dtObj[sheet] = dtRenamed;
      });
      // console.log({ dtObj });
      return dtObj;
    },
    refetchInterval: false, // Disable automatic refetching
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}

function fetchData(): Promise<ServerRawData> {
  if (window.location.hostname === 'localhost') {
    // Logic for local development
    console.log('Running in local development mode');
    return Promise.resolve(serverRawData);
  } else {
    // Logic for production environment (Google Apps Script)
    console.log('Running in production mode');
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
