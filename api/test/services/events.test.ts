import connect, { MongodHelper } from '../db-helper'
import Event from '../../src/models/Event'
import eventService from '../../src/services/event'
import { event1, event2, event3 } from '../fixtures/events'

async function createEvent() {
  const event = new Event({
    date: '24.4.2003',
    description: 'our first ever event',
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

describe('test the event service', () => {
  it('can GET all events', async () => {
    const events = await eventService.getAllEvents()
    expect(events.length).toBe(3)
    expect(events[0].date).toEqual(event1.date)
    expect(events[1].description).toEqual(event2.description)
  })
  it('should get an event with id', async () => {
    const event = await createEvent()
    const found = await eventService.findEventById(event._id)
    expect(found.firstname).toEqual(event.firstname)
    expect(found._id).toEqual(event._id)
  })

  it('should create a event', async () => {
    const event = await createEvent()
    expect(event).toHaveProperty('_id')
    expect(event).toHaveProperty('description', 'our first ever event')
    expect(event).toHaveProperty('date', '24.4.2003')
  })
  it('should update an existing event', async () => {
    const event = await createEvent()
    const update = {
      date: '1.1.2011',
    }
    const updated = await eventService.updateEvent(event._id, update)
    expect(updated).toHaveProperty('_id', event._id)
    expect(updated).toHaveProperty('date', '1.1.2011')
  })

  it('should delete an existing event', async () => {
    expect.assertions(1)
    const event = await createEvent()
    await eventService.deleteEvent(event._id)
    return eventService.findEventById(event._id).catch((e) => {
      expect(e.message).toBe(`Event ${event._id} not found.`)
    })
  })
})
