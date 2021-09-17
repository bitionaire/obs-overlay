import { FC } from 'react';
import './WaitingScene.scss';
import Background from "../components/Background";
import Countdown from "../components/Countdown";

export interface WaitingSceneProps {
    label: string;
}

const WaitingScene: FC<WaitingSceneProps> = ({ label}) => {
    return (
        <div className="waiting-scene">
            <Background />

            <main className="waiting-scene__main">
                <span className="waiting-scene__label">{label}</span>
                <Countdown />
            </main>
        </div>
    );
}

export default WaitingScene;