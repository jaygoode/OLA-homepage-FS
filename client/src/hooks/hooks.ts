import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

// import { Product } from '../types/product';
import { useState, useEffect } from "react";

const useEvent = (eventId: string | undefined) => {
  const [event, setEvent] = useState<Event | undefined>(undefined);
  useEffect(() => {
    if (eventId) {
      fetch(`http://localhost:5000/events/${eventId}`)
        .then((data) => data.json())
        .then((data) => setEvent(data));
    }
  }, [eventId]);
  return event;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useEvent;
