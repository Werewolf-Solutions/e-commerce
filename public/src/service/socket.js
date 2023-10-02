import React from "react";
import { io } from "socket.io-client";

let SOCKET_URL = "http://localhost:5000/";

export const socket = io.connect(SOCKET_URL);
// export const socket = io();
export const SocketContext = React.createContext();
