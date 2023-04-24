import * as React from "react";
import axios from "../node_modules/axios/index";
import { IServerLog, LogType } from './api/service';

export const Log = () => {
  const [logItems, setLogItems] = React.useState<Array<IServerLog>>([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000')
      .then(response => {
        setLogItems(response.data as Array<IServerLog>);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const LogItem = ({module, action, logLevel, context}: IServerLog) => {
    const alert = `alert alert-${logLevel === LogType.success? 'success':'info'}`;
    return (
      <div className={"d-flex justify-content-between ".concat(alert)}>
        <span>{module}</span>
        <span>{action}</span>
        <span>{context}</span>
      </div>
    );
  };

  return (
    <div className="container row col-12">
      {logItems.map((c, i)=>(<LogItem key={i} {...c}/>))}
    </div>
  );
};
