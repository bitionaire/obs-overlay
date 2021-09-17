import {FC, useEffect, useState} from 'react';
import './WaitingScene.scss';
import Background from "../components/Background";

const EndScene: FC = () => {
    const [followers, setFollowers] = useState([]);

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

            <main className="end-scene__main">
                <span className="end-scene__label">The end</span>
            </main>

            <div>
                <p>THX</p>
                <p>for tuning in</p>
                <p>I'm looking forward to the next session with you and hope you enjoyed today's stream.</p>
                <p>If so, join my lovely followers and don't miss the next one.</p>

                <ul>
                    {followers.map(follower => <li key={follower}>{follower}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default EndScene;