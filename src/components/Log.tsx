import * as React from "react";
import styled from "styled-components";
import { fetchLogsAsync, ILog, LogType } from "../api/index";

export const Log = () => {
  const [logItems, setLogItems] = React.useState<Array<Array<ILog>>>([]);
  const refresh = React.useRef<any>(null);

  React.useEffect(() => {
    fetchLogsAsync().then((res) => {
      setLogItems(res.reverse());
    });
  }, []);

  interface ILogSection {
    logs: Array<ILog>;
    children: React.ReactNode;
    index: number;
  }
  const LogSection = ({ index, logs, children }: ILogSection) => {
    const [isOpen, setOpen] = React.useState(index === 0);

    const lastLogOfSession = logs[logs.length - 1];

    React.useEffect(() => {
      if (index === 0) {
        if (isOpen) {
          if (refresh.current === null) {
            refresh.current = setInterval(() => {
              console.log("@> refresh");
              fetchLogsAsync().then((res) => setLogItems(res.reverse()));
            }, 5000);
          }
        } else {
          clearInterval(refresh.current);
          refresh.current = null;
          console.log("@> killing refresh");
        }
      }
    }, [isOpen]);

    const date = new Date(lastLogOfSession.createdAt);
    return (
      <StyledLogSection className="d-flex flex-column mb-2">
        <button
          className="btn btn-primary d-flex justify-content-evenly"
          style={{
            backgroundColor:
              index === 0 ? (isOpen ? "#3869E2" : "#404040") : "#404040",
            border: "none",
          }}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <span>{date.toDateString()}</span>
          <span>{date.toLocaleTimeString()}</span>
          <span>{lastLogOfSession.sessionId}</span>
        </button>
        {isOpen && children}
      </StyledLogSection>
    );
  };

  return (
    <div className="container row col-12">
      <div className="d-flex align-items-center">
        <h3 style={{ color: "#f9f9f9" }}>Logs</h3>
        {/* <StyledStatusCircle color={refresh.current === null ? "#ff9933" : "#66ff66"} /> */}
      </div>
      {logItems.map((c, i) => (
        <LogSection key={i} index={i} logs={c}>
          {c.map((u) => LogItem(u))}
        </LogSection>
      ))}
    </div>
  );
};

const LogItem = (log: ILog) => {
  return (
    <StyledLog>
      <StyledLogSpan logType={log.logLevel}>
        {new Date(log.createdAt).toDateString()}{" "}
        {new Date(log.createdAt).toLocaleTimeString()}
      </StyledLogSpan>
      <StyledLogSpan logType={log.logLevel}>Module: {log.module}</StyledLogSpan>
      <StyledLogSpan logType={log.logLevel}>Action: {log.action}</StyledLogSpan>
      <StyledLogSpan logType={log.logLevel}>
        {log.context ? `Context: ${log.context}` : ""}
      </StyledLogSpan>
    </StyledLog>
  );
};

const StyledLogSection = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.5fr 4fr;
  color: #f9f9f9;
  div {
    margin-right: 50px;
  }
`;

//@ts-ignore
const StyledStatusCircle = styled.span<{
  color: string;
}>`
  display: flex;
  height: 8px;
  width: 8px;
  border-radius: 999px;
  margin-left: 20px;

  background-color: ${(c) => c.color};
`;

const StyledLog = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 2fr 1.4fr 2fr 4fr;
  color: #f9f9f9;
  div {
    margin-right: 50px;
  }
`;

const StyledLogSpan = styled.div<{
  logType: LogType;
}>`
  display: flex;
  color: ${(c) =>
    c.logType === LogType.success
      ? "#66ff66"
      : c.logType === LogType.error
      ? "#ff0000"
      : c.logType === LogType.warn
      ? "#ff9933"
      : "#66ffff"};
  justify-content: space-evenly span {
    margin-right: 50px;
  }
`;
