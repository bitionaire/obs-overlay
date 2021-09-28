import { FC } from 'react';
import './WaitingScene.scss';
import Background from "../components/Background";
import Countdown from "../components/Countdown";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router";

export interface WaitingSceneProps {
    labelKey: string;
    verticalPosition?: 'top' | 'center' | 'bottom';
    horizontalPosition?: 'left' | 'center' | 'right';
    padding?: string;
    background?: boolean;
}

const WaitingScene: FC<WaitingSceneProps> = (
    {
        labelKey,
        verticalPosition = 'center',
        horizontalPosition = 'center',
        padding = '192px',
        background = false
    }) => {
    const { t } = useTranslation();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let justifyContent: string;
    switch (searchParams.get("countdownHorizontalPosition") || horizontalPosition) {
        case 'left':
            justifyContent = 'flex-start'; break;
        case 'center':
            justifyContent = 'center'; break;
        case 'right':
            justifyContent = 'flex-end'; break;
        default:
            justifyContent = 'center';
    }

    let alignItems: string;
    switch (searchParams.get("countdownVerticalPosition") || verticalPosition) {
        case 'top':
            alignItems = 'flex-start'; break;
        case 'center':
            alignItems = 'center'; break;
        case 'bottom':
            alignItems = 'flex-end'; break;
        default:
            alignItems = 'center';
    }

    const backgroundParameter = searchParams.get("background");
    const showBackground = (backgroundParameter && backgroundParameter === 'true') || !(backgroundParameter && background)

    return (
        <>
            {showBackground && <Background />}

            <div className="waiting-scene" style={{ justifyContent, alignItems }}>
                <main className="waiting-scene__main" style={{ padding }}>
                    <span className="waiting-scene__label">{t(labelKey)}</span>
                    <Countdown />
                </main>
            </div>
        </>
    );
}

export default WaitingScene;