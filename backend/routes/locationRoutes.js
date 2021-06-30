import express from 'express'

import {
  getAllLocations,
  getSingleLocation,
  createLocation,
  updateLocation,
  updateStreetAdress,
  addProgram,
  removeProgram,
  deleteLocaiton
} from '../controllers/locationController.js'

const router = express.Router()

// routes for /
router.route('/')
  .get(getAllLocations)
  .post(createLocation)

router.route('/:id')
  .get(getSingleLocation)
  .put(updateLocation)
  .delete(deleteLocaiton)

router.route('/:id/:programId')
  .put(addProgram)
  .delete(removeProgram)

router.route('/:id/newAddress')
  .put(updateStreetAdress)


export default router