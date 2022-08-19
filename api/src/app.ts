import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import cors from 'cors'

import userRouter from './routers/userRouter'
import eventRouter from './routers/eventRouter'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

app.use(cors())
// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())

// Set up routers
app.use('/users', userRouter)
app.use('/events', eventRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
