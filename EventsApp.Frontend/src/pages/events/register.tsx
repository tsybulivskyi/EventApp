import {useForm} from "react-hook-form";
import {Box, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useRouter} from "next/router";
import useEvents from "@/hooks/useEvents";

export interface NewRegistrationFormInput {
    name: string;
    phone: string;
    email: Date;
}

interface ErrorResult {
    error: boolean;
    message: string;
}

function NewRegistrationPage() {
    const {register, handleSubmit, formState: {errors}} = useForm<NewRegistrationFormInput>();
    const {back, query, push} = useRouter();
    const {registerForEvent} = useEvents()
    const [error, setError] = useState<ErrorResult | null>(null);


    const onSubmit = (data: NewRegistrationFormInput) => {

        const registrationId = registerForEvent(data, query.eventId as string)
            .then((registrationId) => {
                if (isNaN(registrationId)) {
                    debugger;
                    setError({error: true, message: registrationId.message});
                } else {
                    push(`/events/congratulations`);
                }


            })
            .catch((error) => {
                debugger
                setError({error: true, message: error.message});
            });
    }

    const handleCancelClick = async (e: any) => {
        e.preventDefault();
        back();
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
                <Stack gap={2.5} sx={{px: 3, py: 4}}>
                    <Typography variant={"h4"}>Register for an event</Typography>
                    <TextField error={!!errors.name}
                               label={"Name"}{...register("name", {required: true})} />
                    <TextField error={!!errors.phone}
                               label={"Phone Number"} {...register("phone", {required: true})} />
                    <TextField error={!!errors.phone} label={"Email Address"}
                               {...register("email", {required: true})} />

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

                </Stack>
                {error && <Typography variant={"h6"}>{error.message}</Typography>}


            </Paper>

        </Box>
    );
}

export default NewRegistrationPage;