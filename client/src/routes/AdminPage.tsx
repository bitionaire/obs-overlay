import Logo from "../components/Logo";
import {useRef} from "react";

const setTimer = (durationInSeconds: number) => {
    const endTime = new Date();
    endTime.setTime(endTime.getTime() + 1000 * durationInSeconds);

    fetch('/api/timer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ endTime: endTime.getTime() })
    }).catch(() => {
        console.error('failed to set timer');
    });
}

const handleShowTitle = (title: string) => {
    fetch('/api/title', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    }).catch(() => {
        console.error('failed to set timer');
    });
}

const AdminPage = () => {
    const titleInput = useRef(null);

    return (
        <div>
            <Logo />
            <h1>Timer</h1>
            <button onClick={() => setTimer(0)}>0</button>
            <button onClick={() => setTimer(5)}>5 sek.</button>
            <button onClick={() => setTimer(3 * 60)}>3 min.</button>
            <button onClick={() => setTimer(5 * 60)}>5</button>
            <button onClick={() => setTimer(10 * 60)}>10</button>

            <input placeholder="Title" ref={titleInput} />
            <button onClick={() => { handleShowTitle((titleInput.current as any).value)}}>Show title</button>
        </div>
    );
}

export default AdminPage;