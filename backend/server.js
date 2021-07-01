import express from 'express'
import dotenv from 'dotenv'
import programRoutes from './routes/programRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import categoryRoutes from './routes/categoryRoute.js'

//dev dependicy packages
import colors from 'colors'
import morgan from 'morgan'

// custom code
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

// mount routes
app.use('/api/v1/programs',programRoutes)
app.use('/api/v1/locations',locationRoutes)
app.use('/api/v1/categories',categoryRoutes)

// add port from process.env
const PORT = process.env.PORT || 5000

// listen for requests
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} and running in ${process.env.NODE_ENV}`.brightYellow)
});

