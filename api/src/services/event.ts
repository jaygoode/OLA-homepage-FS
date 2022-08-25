import { NotFoundError } from '../helpers/apiError'
import Event, { EventDocument } from '../models/Event'

const getAllEvents = async (): Promise<EventDocument[]> => {
  return Event.find()
}

const findEventById = async (eventId: string): Promise<EventDocument> => {
  const foundEvent = await Event.findById(eventId)
  if (!foundEvent) {
    throw new NotFoundError(`Event ${eventId} not found.`)
  }
  return foundEvent
}

const createEvent = async (newEvent: EventDocument): Promise<EventDocument> => {
  return newEvent.save()
}

const deleteEvent = async (eventId: string): Promise<EventDocument | null> => {
  const event = Event.findByIdAndDelete(eventId)
  if (!event) {
    throw new NotFoundError(`Event ${eventId} not found.`)
  }
  return event
}

const updateEvent = async (
  id: string,
  eventUpdate: Partial<EventDocument>
): Promise<EventDocument | null> => {
  const event = await Event.findByIdAndUpdate(id, eventUpdate, {
    new: true,
  })
  if (!event) {
    throw new NotFoundError(`Event ${id} not found.`)
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
