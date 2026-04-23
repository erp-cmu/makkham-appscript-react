function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Makkham Dashboard")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getSheetData() {
  const spreadsheetId = "1nXNMFfmKbMEns0d6IKPEox-z5TTR4BnXNBGTXz-jizk";
  const sheetName = "bnn_dried_bag";
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`);
  }

  const data = sheet.getDataRange().getDisplayValues();
  return {
    headers: data[0],
    rows: data.slice(1),
  };
}

function getAllSheetsData() {
  const spreadsheetId = "1nXNMFfmKbMEns0d6IKPEox-z5TTR4BnXNBGTXz-jizk";
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheets = ss.getSheets();

  const result = {};

  sheets.forEach((sheet) => {
    const data = sheet.getDataRange().getDisplayValues();

    result[sheet.getName()] = {
      headers: data.length ? data[0] : [],
      rows: data.length > 1 ? data.slice(1) : [],
    };
  });

  return result;
}
