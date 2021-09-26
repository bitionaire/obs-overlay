import {FC, useEffect, useState} from 'react';
import './EndScene.scss';
import Background from "../components/Background";
import {useTranslation} from "react-i18next";

const EndScene: FC = () => {
    const [followers, setFollowers] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetch('/api/followers').then((response) => {
            response.json().then(followers => {
                setFollowers(followers);
            })
        });
    }, []);

    return (
        <div className="end-scene">
            <Background />

            <div className="end-scene__label">{t('end.title')}</div>

            {followers.length > 0 && (
                <div className="end-scene__credits">
                    <div className="end-scene__credits-thx">{t('end.thx')}</div>
                    <div>{t('end.thx__subtitle')}</div>
                    <p>{t('end.thx__p1')}</p>
                    <p>{t('end.thx__p2')}</p>

                    <ul className="end-scene__followers">
                        {followers.map(follower => <li key={follower}>{follower}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default EndScene;