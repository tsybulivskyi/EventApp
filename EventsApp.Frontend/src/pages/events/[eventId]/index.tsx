import {useRouter} from "next/router";
import {Box, List, ListItem, Paper, Stack, TextField, Typography} from "@mui/material";
import useEvents from "@/hooks/useEvents";
import {useEffect, useState} from "react";
import {EventDetails, SessionToken} from "@/types";
import {useSession} from "next-auth/react";
import Divider from "@mui/material/Divider";

export default function EventDetailsPage() {
    const {query, push} = useRouter();
    const {data: session,status} = useSession();
    const {getEventById} = useEvents();
    const eventId = Number(query.eventId);
    const [event, setEvent] = useState<EventDetails | null>(null);

    const tokenSession: SessionToken = session as SessionToken

    useEffect(() => {
        if (isNaN(eventId)) return;

        if (!session) {
            push("/")
        } else {
            getEventById(eventId, tokenSession.accessToken).then(
                (event) => setEvent(event)
            );
        }

    }, [status]);


    return (
        <>
            <Typography variant={"h4"}>Event Details</Typography>

            <Typography variant={"h5"}>{event?.name}</Typography>
            <Divider/>
            <Typography variant={"h6"}>Registrations</Typography>


            {event?.registrations.map((registration) => (
                    <Box key={registration.id} sx={{width: 200, m: 1, py: 2}}>
                        <Paper elevation={3}>
                            <Stack gap={3} alignItems="center" sx={{m: 1, p: 1}}>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Name"
                                    defaultValue={registration.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Email Address"
                                    defaultValue={registration.emailAddress}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Phone Number"
                                    defaultValue={registration.phoneNumber}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                            </Stack>
                        </Paper>
                    </Box>
                )
            )}
        </>
    )
}