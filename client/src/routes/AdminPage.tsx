import * as React from "react";
import {useState} from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
    ButtonGroup,
    Button,
    TextField,
    Divider,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails, Slider, Stack
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimerIcon from '@mui/icons-material/Timer';

import './AdminPage.scss';
import Countdown from "../components/Countdown";


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
    const [minutes, setMinutes] = useState(5);

    const handleTimerChange = (event: any, newValue: number) => {
        setMinutes(newValue);
    };

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
                </Tabs>
            </Box>
            <Box className="admin-page__tab-panel">
                {tab === 0 && (
                    <>
                        <Box>
                            <Countdown className="admin-page__countdown" />

                            <Typography variant="overline" display="block">Set timer</Typography>

                            <Stack direction="row" spacing={2}>
                                <Slider
                                    defaultValue={5}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={15}
                                    onChange={handleTimerChange as any}
                                    value={minutes}
                                />
                                <Button variant="contained" endIcon={<TimerIcon />} onClick={setTimer(minutes * 60)}>Submit</Button>
                            </Stack>

                            <Typography variant="overline" display="block">Quick settings</Typography>
                            <ButtonGroup variant="contained">
                                <Button onClick={setTimer(3 * 60)}>3 min.</Button>
                                <Button onClick={setTimer(5 * 60)}>5 min.</Button>
                                <Button onClick={setTimer(10 * 60)}>10 min.</Button>
                            </ButtonGroup>
                        </Box>

                        <Accordion className="admin-page__timer-debug">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Debug</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ButtonGroup variant="contained">
                                    <Button onClick={setTimer(0)} variant="contained">Reset timer</Button>
                                    <Button onClick={setTimer(5)} variant="outlined">Set 5 sec.</Button>
                                </ButtonGroup>
                            </AccordionDetails>
                        </Accordion>
                    </>
                )}

                {tab === 1 && (
                    <Stack direction="row" spacing={2}>
                        <TextField label="Title" placeholder="What's up party people?" variant="outlined" value={title} onChange={handleTitleChange} />
                        <Button variant="contained" onClick={() => { handleShowTitle(title)}}>Show title</Button>
                    </Stack>
                )}
            </Box>
        </Box>
    );
}

export default AdminPage;