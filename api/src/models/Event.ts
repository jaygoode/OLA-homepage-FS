import mongoose, { Document, Schema } from 'mongoose'

export interface EventDocument extends Document {
  date: string
  description: string
  goingToEvent: string[]
}

const eventSchema = new Schema<EventDocument>({
  date: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  goingToEvent: {
    type: [String],
    required: false,
  },
})

const Event = mongoose.model<EventDocument>('Event', eventSchema)
export default Event
