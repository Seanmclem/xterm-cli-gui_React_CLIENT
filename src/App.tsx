import logo from "./logo.svg";
import "./App.css";

import { start, doLS } from "./utils/index";
import { useEffect, useState } from "react";

const App = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      start();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={doLS}>Do LS</button>
        <div id="terminal-container"></div>
        <p></p>
      </header>
    </div>
  );
};

export default App;
