export interface IServerLog {
  module: ServerModuleType;
  action: MailActionType;
  context?: string;
  logLevel?: LogType;
}
export enum ServerModuleType {
  Mail = "Mail",
  Binance = "Binance",
}

export enum MailActionType {
  attachListener = "attach-listener",
  receiveMail = "receive-mail",
  error = "mail-error",
}

export enum LogType {
  info = "[Info]",
  warn = "[Warning]",
  error = "[Error]",
  success = "[Successful]",
}
