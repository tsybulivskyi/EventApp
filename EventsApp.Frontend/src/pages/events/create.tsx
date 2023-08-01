import {useForm} from "react-hook-form";
import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import useEvents from "@/hooks/useEvents";
import {Event, SessionToken} from "@/types";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {Session} from "next-auth";

export interface NewEventFormInput {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    location: string;
}



function CreateEventPage() {
    const {register, handleSubmit, formState: {errors}} = useForm<NewEventFormInput>();
    const router = useRouter();
    const {createEvent, getAllEvents} = useEvents();
    const {data: session} = useSession();

    const tokenSession: SessionToken = session as SessionToken
    const onSubmit = async (data: NewEventFormInput) => {
        await createEvent(data, tokenSession.accessToken);
        router.push("/events");
    }

    const handleCancelClick = async (e: any) => {
        e.preventDefault();
        router.back();
    }


    return (
        <Box
            sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: {md: '1fr 1fr'},
                gap: 2,
            }}
        >
            <Paper elevation={3} sx={{px: 5}}>
                <Stack gap={2.5}>
                    <Typography variant={"h4"}>Create new event</Typography>
                    <TextField error={!!errors.name}
                               label={"Name"}
                               {...register("name", {required: true})} />

                    <TextField error={!!errors.description}
                               label={"Description"}
                               {...register("description", {required: true})} />

                    <TextField error={!!errors.startTime}
                               label={"Start Time"}
                               {...register("startTime", {required: true})} />

                    <TextField error={!!errors.endTime}
                               label={"End Time"}
                               {...register("endTime",{required: true})} />
                    <TextField error={!!errors.location}
                               label={"Location"}
                               {...register("location", {required: true})} />


                </Stack>
                <Box sx={{flexGrow: 1, py: 3}}>
                    <Grid container
                          direction="row"
                          justifyContent="flex-end"
                          alignItems="center" spacing={2}>
                        <Grid item>
                            <Button size="large" variant="contained"
                                    onClick={handleSubmit(onSubmit)}>Submit</Button>
                        </Grid>
                        <Grid item>
                            <Button size="large" variant="outlined" onClick={handleCancelClick}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
};

export default CreateEventPage;