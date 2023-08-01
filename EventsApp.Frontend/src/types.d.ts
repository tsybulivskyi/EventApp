import {Session} from "next-auth";

export interface Event {
    id: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    location: string;

}

interface SessionToken extends Session{
    accessToken: string;
}

export interface Registration {
    id: string;
    name: string;
    emailAddress: string;
    phoneNumber: string;
}

export interface EventDetails extends Event {
    registrations: Registration[];
}
