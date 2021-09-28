import React from "react";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import './Root.scss';
import { useHistory} from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import DevicesIcon from '@mui/icons-material/Devices';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Logo from "../components/Logo";


const Root = () => {
    const history = useHistory();

    return (
        <div className="root">
            <Logo className="root__logo" />

            <List>
                <ListItem>
                    <ListItemButton onClick={() => history.push('/admin')}>
                        <ListItemIcon>
                            <SettingsIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Admin" />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton onClick={() => history.push('/overlay')}>
                        <ListItemIcon>
                            <DesktopWindowsIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Overlay" />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton onClick={() => history.push('/overlay?debug=true')}>
                        <ListItemIcon>
                            <DevicesIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Overlay (Debug)" />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton onClick={() => history.push('/start')}>
                        <ListItemIcon>
                            <PlayCircleFilledIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Start" />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton onClick={() => history.push('/pause')}>
                        <ListItemIcon>
                            <PauseCircleFilledIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Pause" />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton onClick={() => history.push('/end')}>
                        <ListItemIcon>
                            <StopCircleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="End" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    )
}

export default Root;