import {Server} from "socket.io";
import * as http from "http";
import {getState} from "../state";

let io: Server = undefined;

const initializeWebsocketServer = (server: http.Server) => {
    io = new Server(server, {
        path: '/api/listen'
    });

    io.on('connection', (socket) => {
        const timerEndTime = getState().timerEndTime;
        if (timerEndTime) {
            socket.emit('@ozzonair/TIMER_SET', timerEndTime);
        }
    });

    return io;
}

export const getWebsocketServer = () => {
    if (!io) {
        throw new Error('websocket server not initialized')
    }
    return io;
}

export default initializeWebsocketServer;