import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './WaitingScene.scss';
import {useStore} from "../state";
import classNames from 'classnames';
import Background from "../components/Background";

const zeroPad = (value: number) => String(value).padStart(2, '0');
const getRemainingSeconds = (endTime?: Date) => {
    if (!endTime) {
        return MAX_COUNTER;
    }

    const now = new Date();
    const seconds = Math.floor((endTime.getTime() - now.getTime()) / 1000);

    if (seconds < 0) {
        return MAX_COUNTER;
    }
    return seconds > 0 ? seconds : 0;
}

const MAX_COUNTER = -30;

export interface WaitingSceneProps {
    label: string;
}

const WaitingScene: React.FC<WaitingSceneProps> = ({ label}) => {
    const timerEndTime = useStore(state => state.timerEndTime);

    const [counter, setCounter] = useState(getRemainingSeconds(timerEndTime));
    const [showCountdown, setShowCountdown] = useState( counter > MAX_COUNTER);
    const ref = useRef(timerEndTime);
    const nodeRef = useRef(null)

    useEffect(() => {
        if (ref.current !== timerEndTime) {
            ref.current = timerEndTime;
            setShowCountdown(false);
            if (timerEndTime && getRemainingSeconds(timerEndTime) > MAX_COUNTER) {
                const timer = setInterval(() => {
                    setCounter(getRemainingSeconds(timerEndTime));
                    setShowCountdown(true);
                }, 3000);
                return () => clearInterval(timer);
            }
        }

        if (counter > MAX_COUNTER) {
            const timer = setInterval(() => {
                const newCounter = counter - 1;
                setCounter(newCounter);
                if (newCounter <= MAX_COUNTER) {
                    setShowCountdown(false);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
        return () => {};
    }, [timerEndTime, counter]);

    const minutes = zeroPad(Math.floor(counter / 60));
    const seconds = zeroPad(counter % 60);

    const text = counter >= 0 ? `${minutes}:${seconds}` : 'any second';

    return (
        <div className="waiting-scene">
            <Background />

            <main className="waiting-scene__main">
                <span className="waiting-scene__label">{label}</span>
                <CSSTransition
                    classNames={{
                        enter: 'waiting-scene__countdown--enter',
                        exit: 'waiting-scene__countdown--exit',
                    }}
                    className={classNames('waiting-scene__countdown', {
                        'waiting-scene__countdown--text-fade-in': counter < 1,
                        'waiting-scene__countdown--text-faded-in': counter < 0
                    })}
                    in={showCountdown}
                    timeout={{
                        enter: 0, // mount instantly
                        exit: 1000 // unmount once css animation is finished
                    }}
                    nodeRef={nodeRef}
                    unmountOnExit
                >
                    <div ref={nodeRef}>{text}</div>
                </CSSTransition>
            </main>
        </div>
    );
}

export default WaitingScene;