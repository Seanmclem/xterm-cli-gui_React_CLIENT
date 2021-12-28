import logo from "./logo.svg";
import "./App.css";

import { start, runCommand } from "./utils/index";
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <button onClick={() => runCommand("clear")}>clear</button>
          <button onClick={() => runCommand("ls")}>Do LS</button>

          <button onClick={() => runCommand("pwd")}>PWD</button>

          <button onClick={() => runCommand("nano ~/.zshrc")}>Edit zsh</button>
          <button onClick={() => runCommand("\b", false)}>backspace</button>

          <button onClick={() => runCommand("\x1b\x5b\x41", false)}>
            Up Arrow
          </button>
          <button onClick={() => runCommand("\x1b\x5b\x44", false)}>
            Left Arrow
          </button>
          <button onClick={() => runCommand("\x1b\x5b\x43", false)}>
            Right Arrow
          </button>

          <button onClick={() => runCommand("\x1b\x5b\x42", false)}>
            Down Arrow
          </button>

          <button onClick={() => runCommand("\x20", false)}>space</button>

          <button onClick={() => runCommand("\r", false)}>Enter</button>

          <button onClick={() => runCommand("\x1b", false)}>ESC</button>
        </div>
        {/* <button onClick={() => runCommand("\x04", false)}>
          Ctrl something
        </button> */}

        <button onClick={() => runCommand("\x18", false)}>command x?</button>
        <div id="terminal-container" style={{ width: "100%" }}></div>
        <p></p>
      </header>
    </div>
  );
};

export default App;
