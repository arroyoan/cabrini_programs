import Location from '../models/locationModel.js'
import Program from '../models/programModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Gets all locations
// @route   GET /api/v1/locations/
// @access  Public
const getAllLocations = asyncHandler(async (req,res)=>{
  try {
    const numLocation =await Location.countDocuments()
    const locations = await Location.find({}).populate({path:'programs', select: '_id programName'})
    res.status(200).json({
      numLocation,
      locations
    })
  } catch (error) {
    res.status(404).json({
      err:error.message
    })
  }
})

// @desc    Get Single location
// @route   GET /api/location/:id
// @access  Public
const getSingleLocation = asyncHandler(async (req,res)=>{
  try {
    const location = await Location.findById(req.params.id).populate({path:'programs', select:'_id programName'})
    if(location){
      res.status(200).json(location)
    } else{
      throw new Error(`Could not find location with id ${req.params.id}`)
    }
  } catch (error) {
    res.status(404).json({
      err: error.message
    })
  }
})

// @desc    Creates a new location
// @route   POST /api/v1/locations/
// @access  Private/Admin
const createLocation = asyncHandler(async (req,res)=>{
  try {
    const {
      locationName,
      locationWebsite,
      locationAddress
    } = req.body

    // check if location already exists
    const locationCheck = await Location.findOne({locationName})

    if(!locationCheck){
      // create a new location to be added to the database
      const newLocation = new Location({
        locationName,
        locationWebsite,
        locationAddress
      })
      
      await newLocation.save()

    //add res.status().json()
      res.status(201).json({
        newLocation
      })
      

    } else {
      throw new Error('This School already exists!');
    }
    
  } catch (error) {
    console.error(error)
    res.status(400).json({
      err: error.message
    })
  }
})

// @desc    updates location information
// @route   PUT /api/v1/locations/:id
// @access  Private/Admin
const updateLocation = asyncHandler(async (req,res)=>{
  try {
    const location = await Location.findById(req.params.id)
    if(location){
      location.locationName = req.body.locationName || location.locationName
      location.locationWebsite = req.body.locationWebsite || location.locationWebsite
    
      const updatedLocation = await location.save()

      res.status(200).json({
        updatedLocation
      })
    }
    else{
      throw new Error(`Could not find location with id ${req.params.id}`)
    }
    
  } catch (error) {
    res.status(400).json({
      err: error.message
    })
  }
  
})

// @desc    updates location addreess and GeoJSON information
// @route   PUT /api/v1/locations/:id/newAddress
// @access  Private/Admin
const updateStreetAdress = asyncHandler(async (req,res)=>{
  try {
    
  } catch (error) {
    
  }
})

// @desc    Add program to a location
// @route   PUT /api/location/:id/:programId
// @access  Private
const addProgram = asyncHandler(async (req,res)=>{
  try {
    const program = await Program.findById(req.params.programId)
    const location = await Location.findById(req.params.id)

    if(program && location && !location.programs.includes(program._id) ){
      location.programs.push(program._id)
      const updatedLocation = await location.save()
      res.status(200).json(
        updatedLocation
      )
    }
    else{
      // check which one is not found and throw appropriate error
      throw new Error('Error')
    }
  } catch (error) {
    res.status(404).json(
      {err:error.message}
    )
  }
})

// @desc    Remove program from location
// @route   DELETE /api/location/:id/:programId
// @access  Private
const removeProgram = asyncHandler(async (req,res)=>{
  try {
    const program = await Program.findById(req.params.programId)
    const location = await Location.findById(req.params.id)

    if(program && location && location.programs.includes(program._id) ){
      location.programs.pull(program._id)
      const updatedLocation = await location.save()
      res.status(200).json(
        updatedLocation
      )
    }
    else{
      // check which one is not found and throw appropriate error
      throw new Error('Could not find either Program or Location')
    }
  } catch (error) {
    res.status(404).json(
      {err:error.message}
    )
  }
})

// @desc    Delete Location and remove location from programs
// @route   DELETE /api/location/:id/:programId
// @access  Private
const deleteLocaiton = asyncHandler(async (req,res)=>{

})



export {
  getAllLocations,
  getSingleLocation,
  createLocation,
  updateLocation,
  updateStreetAdress,
  addProgram,
  removeProgram,
  deleteLocaiton
}