import { Request, Response, NextFunction } from 'express'
import Event from '../models/Event'
import eventService from '../services/event'

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await eventService.getAllEvents())
  } catch (e) {
    return next(e)
  }
}

export const getSingleEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await eventService.findEventById(req.params.ventId))
  } catch (e) {
    res.send('Event not found.')
  }
}

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, description } = req.body
    const newEvent = new Event({
      date,
      description,
    })
    res.status(200).json(await eventService.createEvent(newEvent))
  } catch (e) {
    res.status(401).send('unsuccessful ')
  }
}

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.eventId
    const eventUpdate = req.body
    console.log(id)
    res.status(200).send(await eventService.updateEvent(id, eventUpdate))
  } catch (e) {
    return next(e)
  }
}

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await eventService.deleteEvent(req.params.EventId)
    res.status(200).send('Event successfully deleted.').end()
  } catch (e) {
    return next(e)
  }
}
