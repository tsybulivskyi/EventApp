import Head from "@/components/Head";
import {Button, Container, List, ListItem, Stack, Typography} from "@mui/material";
import Link from 'next/link'
import {useRouter} from "next/router";

export function IndexPage() {
    const router = useRouter();
    const handleCreateClick = (e:any) => {
        e.preventDefault()
        router.push("/events/create");
    }

    const handleJoinClick = (e:any) => {
        e.preventDefault()
        router.push("/events");
    }
    return (
        <>
            <Head title="Welcome to the Events App"/>
            <Container sx={{}}>
                <Stack alignItems="center" sx={{p: 2.5, gap: 2.5}} spacing={2}>
                    <Typography>Welcome to the Events App</Typography>
                    <Typography>You want to</Typography>
                    <Button variant="outlined" onClick={handleCreateClick}>
                        Create an event
                    </Button>
                    <Button variant="outlined" onClick={handleJoinClick}>
                        Join an event
                    </Button>
                </Stack>
            </Container>
        </>
    )

}

export default IndexPage;