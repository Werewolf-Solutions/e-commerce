import React from "react";
import { io } from "socket.io-client";

let SOCKET_URL = "http://localhost:5001/";

export const socket = io.connect(SOCKET_URL); // io();
export const SocketContext = React.createContext();
