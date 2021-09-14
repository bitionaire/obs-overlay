import express, {Request, Response} from "express";
import { Server } from "socket.io";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cors());

const serverPort = 8080;

app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
});

let timerEndTime: number = undefined;

app.post('/timer', (req: Request<{ endTime: number }>, res: Response) => {
    timerEndTime = req.body.endTime;
    io.emit('@ozzonair/TIMER_SET', timerEndTime);
    res.status(201).send();
});

const server = app.listen( serverPort, () => {
    console.log( `server started at http://localhost:${ serverPort }` );
});

const io = new Server(server, {
    path: '/api/listen',
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    if (timerEndTime) {
        socket.emit('@ozzonair/TIMER_SET', timerEndTime);
    }
});