import create from 'zustand'
import {io} from "socket.io-client";
import {toast} from "react-toastify";

export interface ChatMessage {
    timestamp: Date;
    user: string;
    message: string;
    show: boolean;
}

export interface State {
    timerEndTime?: Date;
    title?: string;
    chat: ChatMessage[];
    showTitle: boolean;
}

export const useStore = create<State>((set, get) => ({
    showTitle: false,
    chat: []
}));

export const socket = io({ path: '/api/listen' });

socket.on('@ozzonair/TIMER_SET', (value) => {
    useStore.setState({ timerEndTime: new Date(value) });
});

socket.on('@ozzonair/SET_TITLE', (value) => {
    useStore.setState({ title: value, showTitle: true });
    setTimeout(() => useStore.setState({ showTitle: false }), 5000);
});

socket.on('@ozzonair/CHAT_MESSAGE', ({ user, message }) => {
    toast(message, { containerId: "chat", style: { '--chat-user': user } as any });
});