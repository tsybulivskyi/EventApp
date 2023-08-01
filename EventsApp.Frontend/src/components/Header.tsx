import {useSession, signIn, signOut} from "next-auth/react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from "@/components/MenuDrawer";
import {useRouter} from "next/router";

export default function Header() {
    const {data: session} = useSession();
    const {push} = useRouter();

    const handleSignIn = (e: any) => {
        e.preventDefault();
        signIn();
    }

    const handleSignOut = async (e: any) => {
        e.preventDefault();
        signOut();
        await push("/");
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <MenuDrawer/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Events App
                    </Typography>
                    {session && <Button color="inherit" onClick={handleSignOut}>Sign out</Button>}
                    {!session && <Button color="inherit" onClick={handleSignIn}>Sign In</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
