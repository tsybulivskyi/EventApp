import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/router";
import {useSession, signIn, signOut} from "next-auth/react";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function MenuDrawer() {
    const [state, setState] = React.useState(
        false
    );

    const router = useRouter();

    const handleAllEventsClick = (e: any) => {
        e.preventDefault();
        router.push("/events");
    }

    const handleHomeClick = (e: any) => {
        e.preventDefault();
        router.push("/");
    }

    const handleCreateEventClick = (e: any) => {
        e.preventDefault();
        router.push("/events/create");
    }

    const handleSignOutClick = async (e: any) => {
        e.preventDefault();
        await signOut();
        await router.push("/");
    }

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };

    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem key={"Home"} disablePadding>
                    <ListItemButton onClick={handleHomeClick}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={"All Events"} disablePadding>
                    <ListItemButton onClick={handleAllEventsClick}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"All Events"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={"Add Event"} disablePadding>
                    <ListItemButton onClick={handleCreateEventClick}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Add Event"}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem key={"Sign Out"} disablePadding>
                    <ListItemButton onClick={handleSignOutClick}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Sign Out"}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                anchor={"left"}
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}