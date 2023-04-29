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

export interface ILog {
  id: number;
  sessionId: string;
  module: ModuleType;
  action: ActionType;
  logLevel: LogType;
  context?: string;
  createdAt: Date;
}

const groupLogsBySessionId = (logs: ILog[]): ILog[][] => {
  const logsBySessionId: ILog[][] = logs.reduce((acc: ILog[][], curr: ILog) => {
    const sessionIndex = acc.findIndex(
      (logs: ILog[]) => logs.length > 0 && logs[0].sessionId === curr.sessionId
    );
    if (sessionIndex === -1) {
      return [...acc, [curr]];
    }
    acc[sessionIndex].push(curr);
    return acc;
  }, []);

  return logsBySessionId;
};

export const fetchLogsAsync = async (): Promise<Array<Array<ILog>>> => {
  try {
    const res = await fetch(`${hostURL}/logs`);
    const data = await res.json();
    return groupLogsBySessionId(data);
  } catch (error: any) {
    return error.message;
  }
};