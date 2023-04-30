import * as React from "react";
import { ILog, ISession, fetchLiveSessionAsync } from "../../api/index";
import styled from "styled-components";
import { Log } from "./Log";

const StyledSession = styled.div<{
    isLive?: boolean;
    refresh: boolean;
}>`
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 0.5fr 1fr 2fr;
  width: 80vw;
  align-items: center;
  padding: 10px 20px;
  background: ${c=>c.isLive? c.refresh?'#3869E2': '#33cc00':'#262626'};
  color: #fff;
  cursor: pointer;
  transition: all 0.6s ease-out;
  
  span {
  }

  &:hover {
    opacity: 0.95;
  }
  user-select: none;
`;

interface SessionProps {
  session?: ISession;
  logs?: Array<ILog>;
  isLive?: boolean;
}

export const Session = ({ isLive, session, logs }: SessionProps) => {
  const [isOpen, setOpen] = React.useState<boolean>(isLive? true: false);
  const refresh = React.useRef<boolean>(false);
  const [liveSession, setLiveSession] = React.useState<{
    session: ISession;
    logs: Array<ILog>;
  }>();

  React.useEffect(() => {
    if (isLive) {
      fetchLiveSessionAsync().then((res) => {
        setLiveSession(res);
        setInterval(() => {
            refresh.current = !refresh.current;
          fetchLiveSessionAsync().then((res) => setLiveSession(res));
        }, 3000);
      });
    }
  }, []);

  if (isLive && liveSession)
    return (
      <>
        <StyledSession refresh={refresh.current} isLive={isLive} onClick={() => setOpen((prev) => !prev)}>
          <span>{liveSession.session.id}</span>
          <span>{new Date(liveSession?.session.createdAt).toDateString()}</span>
          <span>
            {new Date(liveSession.session.createdAt).toLocaleTimeString()}
          </span>
        </StyledSession>
        <div>
          {isOpen && liveSession.logs.map((c) => <Log key={c.id} log={c} />)}
        </div>
      </>
    );
  if (!isLive && session && logs)
    return (
      <>
        <StyledSession refresh={refresh.current}  isLive={isLive} onClick={() => setOpen((prev) => !prev)}>
          <span>{session.id}</span>
          <span>{new Date(session.createdAt).toDateString()}</span>
          <span>{new Date(session.createdAt).toLocaleTimeString()}</span>
        </StyledSession>
        <div>{isOpen && logs.map((c) => <Log key={c.id} log={c} />)}</div>
      </>
    );
  return <></>;
};
