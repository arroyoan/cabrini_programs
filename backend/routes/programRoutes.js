import express from 'express'
import {
  getAllPrograms,
  getSingleProgram,
  createProgram,
  updateProgram,
  addLocation,
  removeLocation,
  deleteProgram
} from '../controllers/programController.js'

// Creates the router
const router = express.Router()

router.route('/')
  .get(getAllPrograms)
  .post(createProgram)

router.route('/:id')
  .get(getSingleProgram)
  .put(updateProgram)
  .delete(deleteProgram)

router.route('/:id/:locationId')
  .put(addLocation) 
  .delete(removeLocation)


export default router