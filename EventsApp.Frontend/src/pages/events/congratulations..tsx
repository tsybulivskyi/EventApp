import {Box, Stack, Typography} from "@mui/material";


export default function CongratulationsPage() {
    return (
        <Box>
            <Stack justifyContent={"center"}>
                <Typography variant={"h4"}>Congratulations!</Typography>
                <Typography variant={"h6"}>You have successfully registered for the event.</Typography>
            </Stack>
        </Box>
    )
}