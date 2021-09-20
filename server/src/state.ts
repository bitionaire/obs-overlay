export interface State {
    timerEndTime?: number;
}

let state: State = {
    timerEndTime: undefined
}

export const getState = () => {
    return state;
}

export const setState = (newPartialState: Partial<State>) => {
    state = {
        ...state,
        ...newPartialState
    }
}