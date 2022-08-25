import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, eventReducerState } from "../../types/event";
const initialState: eventReducerState = {
  eventList: [],
  currentEvent: undefined,
};

export const getAllEvents = createAsyncThunk("getAllEvents", async () => {
  try {
    const data = await fetch("http://localhost:5000/events");
    let result = await data.json();
    return result;
  } catch (error: any) {
    return error.message;
  }
});

export const getSingleEvent = createAsyncThunk(
  "getSingleEvent",
  async (eventId: string) => {
    try {
      const data = await fetch(`http://localhost:5000/events/${eventId}`);
      let result = await data.json();
      return result;
    } catch (error: any) {
      return error.message;
    }
  }
);
export const createEvent = createAsyncThunk(
  "createEvent",
  async (event: Partial<Event>) => {
    const { date, description } = event;
    console.log(event);
    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          description: description,
        }),
      });
      const result = await response.json();
      return result;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "updateEvent",
  async (update: any) => {
    try {
      console.log(update._id);
      const response = await fetch(
        `http://localhost:5000/events/${update._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            update,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "deleteEvent",
  async (id: string) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error: any) {
      return error.message;
    }
  }
);

const eventSlice = createSlice({
  name: "eventReducer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.eventList = action.payload;
          return state;
        }
      )
      .addCase(
        getSingleEvent.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.currentEvent = action.payload;
          return state;
        }
      )
      .addCase(updateEvent.fulfilled, (state, action: any) => {
        state.currentEvent = action.payload;
        return state;
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        return state;
      });
  },
});

export const eventReducer = eventSlice.reducer;
