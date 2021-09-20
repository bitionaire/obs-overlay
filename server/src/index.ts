import express, {Request, Response} from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import initializeTwitchClient from "./twitch";
import initializeWebsocketServer, {getWebsocketServer} from "./websocket";
import {getState, setState} from "./state";

const result = dotenv.config();
if (result.error) {
    throw result.error;
}

// configuration of the server
const initServer = async (serverPort: number = 8080) => {
    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    const { apiClient, userId } = await initializeTwitchClient(app);

    // all endpoints
    app.post('/api/timer', (req: Request<{ endTime: number }>, res: Response) => {
        setState({ timerEndTime: req.body.endTime });
        getWebsocketServer().emit('@ozzonair/TIMER_SET', getState().timerEndTime);
        res.status(201).send();
    });

    app.post('/api/title', (req: Request<{ title: string}>, res: Response) => {
        getWebsocketServer().emit('@ozzonair/SET_TITLE', req.body.title);
        res.status(201).send();
    })

    app.get('/api/followers', async (req: Request, res: Response) => {
        const followersRequest = await apiClient.users.getFollowsPaginated({ followedUser: userId });
        const followers = await followersRequest.getAll();

        res.json(followers.map(follower => follower.userDisplayName));
    });

    // starting the server
    const server = app.listen( serverPort, async () => {
        console.log(`server started at http://localhost:${ serverPort }`);
        /* TODO await eventSubMiddleware.markAsReady();
        await eventSubMiddleware.subscribeToChannelFollowEvents(userId, (event) => {
            console.log(`${event.userDisplayName} just followed ${event.broadcasterDisplayName}!`);
        });*/
    });

    // websocket stuff
    initializeWebsocketServer(server);
};

initServer().catch((err) => {
    console.error('failed to start server', err);
})




