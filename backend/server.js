import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import mongoSanitize from 'express-mongo-sanitize'

import programRoutes from './routes/programRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import categoryRoutes from './routes/categoryRoute.js'

//dev dependicy packages
import colors from 'colors'
import morgan from 'morgan'

import connectDB from './config/db.js'

// bring in environment variables
dotenv.config()

// create express application
const app = express()

// add json parser
app.use(express.json())

// connect to the database
connectDB()

// add morgan
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// sanizes data from user
app.use(mongoSanitize())

// mount routes
app.use('/api/v1/programs',programRoutes)
app.use('/api/v1/locations',locationRoutes)
app.use('/api/v1/categories',categoryRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}


// add port from process.env
const PORT = process.env.PORT || 5000

// listen for requests
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} and running in ${process.env.NODE_ENV}`.brightYellow)
});

