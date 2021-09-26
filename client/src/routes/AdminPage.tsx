import * as React from "react";
import {useState} from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {ButtonGroup, Button, TextField} from "@mui/material";

import './AdminPage.scss';


const setTimer = (durationInSeconds: number) => () => {
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
    const [tab, setTab] = useState(0);
    const [title, setTitle] = useState('');

    const handleTabChange = (e: React.SyntheticEvent, newTab: number) => {
        setTab(newTab);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    return (
        <Box className="admin-page">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Timer" />
                    <Tab label="Title" />
                    <Tab label="Settings" />
                </Tabs>
            </Box>
            <Box className="admin-page__tab-panel">
                {tab === 0 && (
                    <>
                        <Box>
                            <ButtonGroup variant="contained">
                                <Button onClick={setTimer(3 * 60)}>3 min.</Button>
                                <Button onClick={setTimer(5 * 60)}>5 min.</Button>
                                <Button onClick={setTimer(10 * 60)}>10 min.</Button>
                            </ButtonGroup>
                        </Box>
                        <Box>
                            <Button onClick={setTimer(0)} variant="contained">Reset</Button>
                            <Button onClick={setTimer(5)} variant="outlined">Debug (5 sek.)</Button>
                        </Box>
                    </>
                )}

                {tab === 1 && (
                    <>
                        <TextField label="Title" placeholder="Some title here" variant="outlined" value={title} onChange={handleTitleChange} />
                        <Button variant="contained" onClick={() => { handleShowTitle(title)}}>Show</Button>
                    </>
                )}

                {tab === 2 && (
                    <div>Test</div>
                )}
            </Box>
        </Box>
    );
}

export default AdminPage;