import {SessionProvider} from "next-auth/react"
import "@/styles/global.css"

import type {AppProps} from "next/app"
import type {Session} from "next-auth"
import {ThemeProvider} from "@mui/material";
import Header from "@/components/Header";

export default function App({
                                Component,
                                pageProps: {session, ...pageProps},
                            }: AppProps<{ session: Session }>) {
    return (
            <SessionProvider session={session}>
                <Header></Header>
                <Component {...pageProps} />
            </SessionProvider>
    )
}