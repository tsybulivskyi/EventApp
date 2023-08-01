import {Button, Card, CardActions, CardContent, Link, ListItem, ListItemButton, Typography} from "@mui/material";
import React from "react";
import {Event} from "@/types";
import {useSession} from "next-auth/react";

interface EventCardProps {
    event: Event;
}

export default function EventCard({event}: EventCardProps) {
    const {data: session} = useSession();
    console.log("session", session);

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {event.startTime.toDateString()} - {event.endTime.toDateString()}
                </Typography>
                <Typography variant="h5" component="div">
                    {event.name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {event.location}
                </Typography>
                <Typography variant="body2">
                    {event.description}
                </Typography>
            </CardContent>
            <CardActions>
                {session && (<Button size="small" href={`/events/${event.id}`}>See registrations</Button>)}
                {!session && (<Button size="small" href={`/events/register?eventId=${event.id}`}>Register</Button>)}
            </CardActions>
        </Card>
    )
}