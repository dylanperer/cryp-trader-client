import styled from "styled-components";
import { ILog } from "../../api/index";

interface LogProps {
  log: ILog;
}

const StyledLog = styled.div<{
  colour: string;
}>`
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 0.5fr 1fr 2fr;
  padding: 6px 20px;

  background-color: #000;
  color: ${(c) => c.colour};
  user-select: none;

  span {
    margin-right: 10px;
  }

  &:hover{
    opacity: .75;
  }

  transition: all .6s ease-out;
`;

export const Log = ({ log }: LogProps) => {
  const getLogColour = () => {
    switch (log.logLevel) {
      case "[Successful]":
        return "#66ff66";
      case "[Error]":
        return "#ff0000";
      case "[Warning]":
        return "#ff9933";
      default:
        return "#66ffff";
    }
  };
  return (
    <StyledLog colour={getLogColour()}>
      <span>{new Date(log.createdAt).toLocaleDateString()}</span>
      <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
      <span>{log.module}</span>
      <span>{log.action}</span>
      <span>{log.context}</span>
    </StyledLog>
  );
};
