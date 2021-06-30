import express from 'express'

import {
  getAllLocations,
  createLocation,
  updateLocation,
  addProgram
} from '../controllers/locationController.js'

const router = express.Router()

// routes for /
router.route('/')
  .get(getAllLocations)
  .post(createLocation)

router.route('/:id')
  .put(updateLocation)

router.route('/:id/:programId')
  .put(addProgram)


export default router