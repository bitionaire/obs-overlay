import {Express} from "express";
import {ClientCredentialsAuthProvider} from "@twurple/auth";
import {ApiClient} from "@twurple/api";
import {EventSubMiddleware} from "@twurple/eventsub";
import initializeTwitchChatClient from "./chat";
import { v4 as uuidv4 } from 'uuid';

const initializeTwitchClient = async (app: Express) => {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
    const apiClient = new ApiClient({ authProvider });

    const userId = await apiClient.users.getUserByName(process.env.TWITCH_USER);

    const twitchEventSubMiddleware = new EventSubMiddleware({
        apiClient,
        hostName: 'localhost',
        pathPrefix: '/api/twitch',
        secret: uuidv4()
    });
    await twitchEventSubMiddleware.apply(app);

    // TODO initializeTwitchChatClient(authProvider)

    return {
        apiClient,
        eventSubMiddleware: twitchEventSubMiddleware,
        userId
    }
}

export default initializeTwitchClient;