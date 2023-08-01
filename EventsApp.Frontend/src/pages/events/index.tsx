import {NextPage} from "next";
import Head from "@/components/Head";
import {Box, Container, Typography} from "@mui/material";
import EventList from "@/components/EventList";
import {Event} from "@/types";
import useEvents from "@/hooks/useEvents";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";


const EventsPage: NextPage = () => {
    const {getAllEvents} = useEvents();
    const {data: session, status} = useSession();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getAllEvents().then(
            (events) => setEvents(events)
        )

    }, [status]);


    return (
        <>
            <Head title="Events"/>
            <Container>
                <Box sx={{pr: 0}}>
                    <Typography variant={'h2'} color="black" mb={3.5} pl={2.5}>Events</Typography>
                </Box>
                <EventList events={events}/>

            </Container>
        </>
    )
}

export default EventsPage;