import { Terminal } from "xterm";
import "xterm/css/xterm.css"; // DO NOT forget importing xterm.css
import { Socket } from "socket.io-client";

export class TerminalUI {
  terminal: Terminal;
  socket: Socket;

  constructor(socket: Socket) {
    this.terminal = new Terminal();

    /* You can make your terminals colorful :) */
    this.terminal.setOption("theme", {
      background: "#202B33",
      foreground: "#F5F8FA",
    });

    this.socket = socket;
  }

  /**
   * Attach event listeners for terminal UI and socket.io client
   */
  startListening() {
    this.terminal.onData((data) => this.sendInput(data));
    this.socket.on("output", (data) => {
      // When there is data from PTY on server, print that on Terminal.
      this.write(data);
    });
  }

  doLS() {
    this.socket.emit("input", "ls\n");
  }

  /**
   * Print something to terminal UI.
   */
  write(text: string) {
    this.terminal.write(text);
  }

  /**
   * Utility function to print new line on terminal.
   */
  prompt() {
    this.terminal.write(`\\r\\n$ `);
  }

  /**
   * Send whatever you type in Terminal UI to PTY process in server.
   * @param {*} input Input to send to server
   */
  sendInput(input: string) {
    console.log({ input });
    this.socket.emit("input", input);
  }

  /**
   *
   * container is a HTMLElement where xterm can attach terminal ui instance.
   * div#terminal-container in this example.
   */
  attachTo(container: HTMLElement) {
    this.terminal.open(container);
    // Default text to display on terminal.
    this.terminal.write("Terminal Connected");
    this.terminal.write("");
    this.prompt();
  }

  clear() {
    this.terminal.clear();
  }
}
