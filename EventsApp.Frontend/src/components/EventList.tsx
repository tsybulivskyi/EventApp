import {Link, List, ListItem, ListItemButton, Typography} from "@mui/material";
import React from "react";
import {Event} from "@/types";
import EventCard from "@/components/EventCard";
import {useSession} from "next-auth/react";


interface EventListProps {
    events: Event[];
}

export default function EventList({events}: EventListProps): JSX.Element {


    return (
        <div>
            <List>
                {events.map((event) => (
                    <ListItem key={event.id}>
                        <EventCard event={event}/>
                    </ListItem>
                ))}
            </List>
        </div>


    )
}