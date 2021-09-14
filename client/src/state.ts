import create from 'zustand'
import {io} from "socket.io-client";

export interface State {
    timerEndTime?: Date;
    setTimer: (endTime: Date) => void;
}

export const useStore = create<State>(set => ({
    timerEndTime: undefined,
    setTimer: (timerEndTime: Date) => set(state => ({ timerEndTime }))
}));

const socket = io('http://localhost:8080', { path: '/api/listen' });

socket.on('@ozzonair/TIMER_SET', (value) => {
    console.log('new timer set', value);
    useStore.setState({ timerEndTime: new Date(value) });
})