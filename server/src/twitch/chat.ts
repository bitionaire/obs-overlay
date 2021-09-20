import { ChatClient } from '@twurple/chat';
import {AuthProvider} from "@twurple/auth";
import {getWebsocketServer} from "../websocket";

const initializeTwitchChatClient = (authProvider: AuthProvider) => {
    const chatClient = new ChatClient({ authProvider, channels: [ process.env.TWITCH_USER ] });
    chatClient.connect().then(() => {
        chatClient.onMessage((channel, user, message) => {
            if (message === '!ping') {
                chatClient.say(channel, 'Pong!');
            } else if (message === '!dice') {
                const diceRoll = Math.floor(Math.random() * 6) + 1;
                chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
            } else {
                getWebsocketServer().emit('@ozzonair/CHAT_MESSAGE', {
                    user,
                    message
                });
            }
        });
    });
}

export default initializeTwitchChatClient;