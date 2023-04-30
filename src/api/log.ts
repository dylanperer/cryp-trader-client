import { hostURL } from "./index";

export enum ModuleType {
  Mail = "Mail",
  Binance = "Binance",
  Server = "Server",
  Api = "Express",
  Database = "Database",
}

export enum ActionType {
  addMailListener = "Attaching mail listener",
  onReceiveMail = "Receiving mail",
  mailError = "Mail error",
  mailRestart = "Restarting listener",
  mailRefresh = "Restarting refresh",
  alertParse = "Parsing alert",

  serverStart = "String server",
  serverError = "Server error",

  apiStarted = "Starting express api",
  apiError = "Express error",
  apiEndpoint = "Express endpoint",

  connectDatabase = "Connecting to database",
  databaseError = "Database error",
  databaseInsert = "Inserting into database",

  connectBinance = "Connecting to binance",
}

export enum LogType {
  info = "[Info]",
  warn = "[Warning]",
  error = "[Error]",
  success = "[Successful]",
}

export interface IServerLog {
  module: ModuleType;
  action: ActionType;
  context?: string;
  logLevel?: LogType;
}



export type ISession = {
  id: number
  createdAt: Date
  hasEnded: string
  endAt: Date | null
}

export type ILog = {
  id: number
  sessionId: number
  module: string
  action: string
  logLevel: string
  context: string | null
  createdAt: Date
}

export const fetchArchivedSessionsAsync = async (): Promise<Array<{ session: ISession; logs: Array<ILog> }>> => {
  try {
    const res = await fetch(`${hostURL}/log/archive`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchLiveSessionAsync = async (): Promise<{ session: ISession; logs: Array<ILog> }> => {
  try {
    const res = await fetch(`${hostURL}/log/live`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
};