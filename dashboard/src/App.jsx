import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState(null);

  const handleResetApi = () => {
    setApiKey(() => null);
  };

  return <div></div>;
}

export default App;
