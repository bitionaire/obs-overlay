import { FC } from 'react';
import './WaitingScene.scss';
import Background from "../components/Background";
import Countdown from "../components/Countdown";
import {useTranslation} from "react-i18next";

export interface WaitingSceneProps {
    labelKey: string;
}

const WaitingScene: FC<WaitingSceneProps> = ({ labelKey}) => {
    const { t } = useTranslation();

    return (
        <div className="waiting-scene">
            <Background />

            <main className="waiting-scene__main">
                <span className="waiting-scene__label">{t(labelKey)}</span>
                <Countdown />
            </main>
        </div>
    );
}

export default WaitingScene;