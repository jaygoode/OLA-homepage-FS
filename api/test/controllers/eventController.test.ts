import connect, { MongodHelper } from '../db-helper'
import { event1, event2, event3 } from '../fixtures/events'
import Event from '../../src/models/event'
import eventService from '../../src/services/event'
import request from 'supertest'
import app from '../../src/app'
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
} from '../../src/controllers/events'

const nonExistingeventId = '5e57b77b5744fa0b461c7906'

async function CreateEvent() {
  const event = new Event({
    date: '1.1.2019',
    description: 'an event of OLA',
  })
  return await eventService.createEvent(event)
}

let mongoHelper: MongodHelper

beforeAll(async () => {
  mongoHelper = await connect()
})

beforeEach(async () => {
  await Event.insertMany([event1, event2, event3])
})

afterEach(async () => {
  await mongoHelper.clearDatabase()
})

afterAll(async () => {
  await mongoHelper.closeDatabase()
})

describe('event controller', () => {
  it('should get all events', async () => {
    const response = await request(app).get('/events')
    expect(response.status).toBe(200)
  })
  it('should get single event by id', async () => {
    const event = await CreateEvent()
    const response = await request(app).get(`/events/${event._id}`)
    expect(response.status).toBe(200)
  })
  it('should create event', async () => {
    const response = await request(app).post(`/events/`).send({
      date: '14.10.2019',
      description: 'a new event',
    })
    expect(response.status).toBe(200)
  })
  it('should update event', async () => {
    const event = await CreateEvent()
    const response = await request(app).patch(`/events/${event._id}`).send({
      date: '14.3.2019',
      description: 'a new event',
    })
    expect(response.status).toBe(200)
    expect(response.body.date).toBe('14.3.2019')
  })
  it('should delete event', async () => {
    const event = await CreateEvent()
    const response = await request(app).delete(`/events/${event._id}`)
    expect(response.status).toBe(200)
    expect(response.text).toBe('Event successfully deleted.')
  })
})
