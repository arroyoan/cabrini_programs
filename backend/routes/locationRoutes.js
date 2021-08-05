import express from 'express'

import {
  getAllLocations,
  getSingleLocation,
  createLocation,
  updateLocation,
  updateStreetAdress,
  addProgram,
  removeProgram,
  addCategory,
  removeCategory,
  deleteLocation
} from '../controllers/locationController.js'

const router = express.Router()

// routes for /
router.route('/')
  .get(getAllLocations)
  .post(createLocation)

router.route('/newAddress/:id')
  .put(updateStreetAdress)

router.route('/:id')
  .get(getSingleLocation)
  .put(updateLocation)
  .delete(deleteLocation)

router.route('/:id/:programId')
  .put(addProgram)
  .delete(removeProgram)

router.route('/:id/category/:categoryId')
.put(addCategory)
.delete(removeCategory)




export default router