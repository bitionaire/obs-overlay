import create from 'zustand'
import {io} from "socket.io-client";

export interface State {
    timerEndTime?: Date;
    title?: string;
    showTitle: boolean;
    setTimer: (endTime: Date) => void;
}

export const useStore = create<State>(set => ({
    showTitle: false,
    setTimer: (timerEndTime: Date) => set(state => ({ timerEndTime }))
}));

export const socket = io({ path: '/api/listen' });

socket.on('@ozzonair/TIMER_SET', (value) => {
    useStore.setState({ timerEndTime: new Date(value) });
});

socket.on('@ozzonair/SET_TITLE', (value) => {
    useStore.setState({ title: value, showTitle: true });
    setTimeout(() => useStore.setState({ showTitle: false }), 5000);
})