import { TerminalUI } from "./TerminalUI";
import io from "socket.io-client";
import { Terminal } from "xterm";

// IMPORTANT: Make sure you replace this address with your server address.

const serverAddress = "http://localhost:8080";

function connectToSocket(serverAddress: string) {
  return new Promise((res) => {
    const socket = io(serverAddress);
    res(socket);
  });
}

export let terminal: null | TerminalUI = null;

function startTerminal(container: any, socket: any) {
  // Create an xterm.js instance.
  terminal = new TerminalUI(socket);

  // Attach created terminal to a DOM element.
  terminal.attachTo(container);

  // When terminal attached to DOM, start listening for input, output events.
  // Check TerminalUI startListening() function for details.
  terminal.startListening();
}

export const doLS = () => terminal?.doLS();

export function start() {
  const container = document.getElementById("terminal-container");
  // Connect to socket and when it is available, start terminal.
  connectToSocket(serverAddress).then((socket) => {
    startTerminal(container, socket);
  });
}

// Better to start on DOMContentLoaded. So, we know terminal-container is loaded
// start();
