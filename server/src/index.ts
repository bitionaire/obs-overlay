import express, {Request, Response} from "express";
import { Server } from "socket.io";
import bodyParser from 'body-parser';
import { ApiClient } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth';
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
    throw result.error;
}

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

/*const user = apiClient.helix.users.getUserByName("ozzonair").then((user) => {
    console.log("user", user.displayName);
});*/

// configuration of the server
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
const serverPort = 8080;

// internal state of the server
let timerEndTime: number = undefined;

// all endpoints
app.post('/api/timer', (req: Request<{ endTime: number }>, res: Response) => {
    timerEndTime = req.body.endTime;
    io.emit('@ozzonair/TIMER_SET', timerEndTime);
    res.status(201).send();
});

app.get('/api/followers', async (req: Request, res: Response) => {
    const userId = await apiClient.users.getUserByName('ozzonair');

    const followersRequest = await apiClient.users.getFollowsPaginated({ followedUser: userId });
    const followers = await followersRequest.getAll();

    res.json(followers.map(follower => follower.userDisplayName));
});

// starting the server
const server = app.listen( serverPort, () => {
    console.log( `server started at http://localhost:${ serverPort }` );
});

// websocket stuff
const io = new Server(server, {
    path: '/api/listen'
});

io.on('connection', (socket) => {
    if (timerEndTime) {
        socket.emit('@ozzonair/TIMER_SET', timerEndTime);
    }
});