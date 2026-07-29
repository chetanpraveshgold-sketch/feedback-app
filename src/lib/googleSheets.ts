/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const getSanitizedEnv = (name: string): string => {
  let val = (process.env[name] || '').trim();
  if (val.startsWith('"') && val.endsWith('"')) {
    val = val.slice(1, -1);
  }
  if (val.startsWith("'") && val.endsWith("'")) {
    val = val.slice(1, -1);
  }
  return val;
};

const clientEmail = getSanitizedEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL');
const privateKey = getSanitizedEnv('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');
const spreadsheetId = getSanitizedEnv('GOOGLE_SPREADSHEET_ID');

// Fallback JSON database file for local development and preview testing
const MOCK_DB_PATH = 'C:/Users/lenovo/.gemini/antigravity-ide/brain/49e98461-2f05-4359-b7af-c8d3bac0f118/mock_spreadsheet.json';

const isMockMode = process.env.USE_MOCK_STORAGE === 'true';

const readMockDatabase = (): Record<string, any[][]> => {
  try {
    if (fs.existsSync(MOCK_DB_PATH)) {
      const data = fs.readFileSync(MOCK_DB_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading mock database:', e);
  }
  return { Feedbacks: [] };
};

const writeMockDatabase = (db: Record<string, any[][]>) => {
  try {
    const dir = path.dirname(MOCK_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing mock database:', e);
  }
};

let cachedAuth: any = null;
let cachedSheets: any = null;

const getGoogleAuth = () => {
  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets Service Account credentials are missing.');
  }
  if (!cachedAuth) {
    cachedAuth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
  }
  return cachedAuth;
};

const getSheetsClient = () => {
  if (!cachedSheets) {
    const auth = getGoogleAuth();
    cachedSheets = google.sheets({ version: 'v4', auth });
  }
  return cachedSheets;
};

// Append a single row of values to a tab in the spreadsheet
export const appendToGoogleSheet = async (sheetName: string, rowValues: any[]) => {
  if (isMockMode) {
    console.log(`[MOCK MODE] Appending row to Sheet: ${sheetName}`, rowValues);
    const db = readMockDatabase();
    if (!db[sheetName]) db[sheetName] = [];
    db[sheetName].push(rowValues);
    writeMockDatabase(db);
    return;
  }

  const sheets = getSheetsClient();
  
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:A`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [rowValues],
    },
  });
};

// Fetch data cells from a tab
export const getFromGoogleSheet = async (sheetName: string, range: string = 'A:Z') => {
  if (isMockMode) {
    const db = readMockDatabase();
    return db[sheetName] || [];
  }

  const sheets = getSheetsClient();
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${range}`,
  });
  
  return response.data.values || [];
};

// Update specified cell range (used for updating callback statuses or resolutions)
export const updateGoogleSheetRow = async (sheetName: string, range: string, rowValues: any[]) => {
  if (isMockMode) {
    console.log(`[MOCK MODE] Updating row in Sheet: ${sheetName}, range: ${range}`, rowValues);
    
    // Parse row number from range (e.g. "A5:K5" -> rowNumber is 5)
    const match = range.match(/\d+/);
    if (!match) return;
    
    const rowNumber = parseInt(match[0], 10);
    const arrayIndex = rowNumber - 2; // Offset for header row
    
    const db = readMockDatabase();
    if (db[sheetName] && db[sheetName][arrayIndex]) {
      db[sheetName][arrayIndex] = rowValues;
      writeMockDatabase(db);
    }
    return;
  }

  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!${range}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [rowValues],
    },
  });
};
