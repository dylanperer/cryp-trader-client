import { LogDashboard } from "./components/log/LogDashboard";

export const App = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#020303", width: "100vw", height: '100vh' }}
    >
      <div className="d-flex mt-5">
        <LogDashboard />
      </div>
    </div>
  );
};
