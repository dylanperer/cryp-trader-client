import * as React from "react";
import styled from "styled-components";
import { ILog, ISession, fetchArchivedSessionsAsync } from "../../api/log";
import { Session } from "./Session";

const StyledLogDashboard = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;

  gap: 8px;
`;

export const LogDashboard = () => {
  const [archivedSessions, setArchivedSessions] = React.useState<
    Array<{ session: ISession; logs: Array<ILog> }>
  >([]);

  React.useEffect(() => {
    fetchArchivedSessionsAsync().then((res) => setArchivedSessions(res));
  }, []);

  return (
    <StyledLogDashboard>
      <span>Live</span>
      <Session isLive={true}/>
      <span>Archived</span>
      {archivedSessions.map((c) => (
        <Session session={c.session} logs={c.logs} key={c.session.id}/>
      ))}
    </StyledLogDashboard>
  );
};
