import express from 'express'
import {
  getAllEvents,
  createEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/events'
const eventRouter = express.Router()

eventRouter.get('/', getAllEvents)
eventRouter.post('/', createEvent)
eventRouter.get('/:eventId', getSingleEvent)
eventRouter.patch('/:eventId', updateEvent)
eventRouter.delete('/:eventId', deleteEvent)

export default eventRouter
