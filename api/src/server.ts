// import errorHandler from 'errorhandler'
import mongoose from 'mongoose'
import path from 'path'
import app from './app'
import { MONGODB_URI } from './util/secrets'
import logger from './util/logger'
import express from 'express'

const mongoUrl = MONGODB_URI

app.use(express.static(path.resolve(__dirname, '../../client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
})

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
// if (process.env.NODE_ENV === 'development') {
//   app.use(errorHandler())
// }
// huh
// Start Express server
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})
