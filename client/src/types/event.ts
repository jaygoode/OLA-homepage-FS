export interface Event {
  _id: string;
  date: string;
  description: string;
}

export interface updateEvent {
  _id: string;
  update: Partial<Event>;
}

export interface eventReducerState {
  eventList: Event[];
  currentEvent: Event | undefined;
}
