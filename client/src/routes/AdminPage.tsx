const setTimer = (durationInSeconds: number) => {
    const endTime = new Date();
    endTime.setTime(endTime.getTime() + 1000 * durationInSeconds);

    fetch('http://localhost:8080/timer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ endTime: endTime.getTime() })
    }).catch(() => {
        console.error('failed to set timer');
    });
}

const AdminPage = () => {
    return (
        <div>
            <h1>Timer</h1>
            <button onClick={() => setTimer(0)}>0</button>
            <button onClick={() => setTimer(3 * 60)}>3 min.</button>
            <button onClick={() => setTimer(5 * 60)}>5</button>
            <button onClick={() => setTimer(10 * 60)}>10</button>
        </div>
    );
}

export default AdminPage;