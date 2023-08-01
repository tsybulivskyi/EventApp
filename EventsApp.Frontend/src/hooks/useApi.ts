import {useSession} from "next-auth/react";

export default function useApi() {

    async function get(url: string, token?: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        let headers: [string, string][] = [];

        if (token) {
            headers.push(["Authorization", `Bearer ${token}`]);
        }

        const res = await fetch(apiUrl + url, {
            headers: headers
        })
        return await res.json();
    }

    async function post(url: string, body: any, token?: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        let headers: [string, string][] = [];

        if (token) {
            headers.push(["Authorization", `Bearer ${token}`]);
        }
        const res = await fetch(apiUrl + url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await res.json();
    }

    return {
        get,
        post
    }
}