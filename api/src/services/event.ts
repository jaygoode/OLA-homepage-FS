import { NotFoundError } from '../helpers/apiError'
import Event, { EventDocument } from '../models/Event'

const getAllEvents = async (): Promise<EventDocument[]> => {
  return Event.find()
}

const findEventById = async (EventId: string): Promise<EventDocument> => {
  const foundEvent = await Event.findById(EventId)
  if (!foundEvent) {
    throw new NotFoundError(`Event ${EventId} not found.`)
  }
  return foundEvent
}

const createEvent = async (newEvent: EventDocument): Promise<EventDocument> => {
  return newEvent.save()
}

const deleteEvent = async (EventId: string): Promise<EventDocument | null> => {
  const event = Event.findByIdAndDelete(EventId)
  if (!event) {
    throw new NotFoundError(`Event ${EventId} not found.`)
  }
  return event
}

const updateEvent = async (
  eventId: string,
  eventUpdate: Partial<EventDocument>
): Promise<EventDocument | null> => {
  const event = await Event.findByIdAndUpdate(eventId, eventUpdate, {
    new: true,
  })
  if (!event) {
    throw new NotFoundError(`Event ${eventId} not found.`)
  }
  return event
}

export default {
  getAllEvents,
  findEventById,
  createEvent,
  updateEvent,
  deleteEvent,
}
