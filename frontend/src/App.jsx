import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "./contexts/UserContext";

function App() {
  const { fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export default App;
