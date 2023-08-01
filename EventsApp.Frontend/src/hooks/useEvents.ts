import { Event, EventDetails } from "@/types";
import { NewEventFormInput } from "@/pages/events/create";
import { NewRegistrationFormInput } from "@/pages/events/register";
import useApi from "@/hooks/useApi";

export default function useEvents() {
  const { get, post } = useApi();

  const getAllEvents = async (): Promise<Event[]> => {
    const events = await get("/api/Events");
    events.map((e: Event) => {
      e.startTime = new Date(e.startTime);
      e.endTime = new Date(e.endTime);
    });

    return events;
  };

  const getEventById = (id: Number, token: string): Promise<EventDetails> => {
    return get(`/api/Events/${id}`, token);
  };

  const createEvent = (event: NewEventFormInput, token: string) => {
    return post("/api/Events", event, token);
  };

  const registerForEvent = async (
    userInput: NewRegistrationFormInput,
    eventId: string,
  ) => {
    const newRegistration = {
      ...userInput,
      eventId: eventId,
    };

    return  await post(
      `/api/events/${eventId}/register`,
      newRegistration,
    );

  };

  return {
    getAllEvents,
    getEventById,
    createEvent,
    registerForEvent
  };
}
