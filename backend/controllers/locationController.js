import Location from '../models/locationModel.js'
import Program from '../models/programModel.js'
import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'
import getLocationItems from '../utils/getLocationItems.js'

// @desc    Gets all locations
// @route   GET /api/v1/locations/
// @access  Public
const getAllLocations = asyncHandler(async (req,res)=>{
  try {
    // helper functions that creates the filters that the user has passed in
    const [filters] = getLocationItems(req.query)

    const documentCount =await Location.countDocuments({...filters})
    const locations = await Location.find({...filters})
      .populate({path:'categories', select: '_id categoryName'})
      .sort({locationName:1})

    res.status(200).json({
      documentCount,
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
    const location = await Location.findById(req.params.id)
      .populate({path:'programs', select:'_id programName'})
      .populate({path:'categories', select: '_id categoryName'})
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
// @access  Private
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
// @access  Private
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

// @desc    updates location address and GeoJSON information
// @route   PUT /api/v1/locations/newAddress/:id
// @access  Private
const updateStreetAdress = asyncHandler(async (req,res)=>{
  try {
    const location = await Location.findById(req.params.id)
    if(location){
      location.locationAddress = req.body.locationAddress || undefined
      location.updateAddress = true
      const updatedLocation = await location.save()

      res.status(200).json(
        updatedLocation
      )
    } else {
      throw new Error(`Could not find location with id ${req.params.id}`)
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({
      err:error.message
    })
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
      throw new Error('Could not find either Program or Location or Program was not in the locations program array')
    }
  } catch (error) {
    res.status(404).json(
      {err:error.message}
    )
  }
})

// @desc    Add category to a location
// @route   PUT /api/location/:id/:categoryId
// @access  Private
const addCategory = asyncHandler(async (req,res)=>{
  try {
    const category = await Category.findById(req.params.categoryId)
    const location = await Location.findById(req.params.id)

    if(category && location && !location.categories.includes(category._id) ){
      location.categories.push(category._id)
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

// @desc    Remove a category
// @route   DELETE /api/v1/locations/:id/category/:categoryId
// @access  Private
const removeCategory = asyncHandler(async (req,res)=>{
  try {
    const location = await Location.findById(req.params.id)
    const category = await Category.findById(req.params.categoryId)

    if(location && category && location.categories.includes(req.params.categoryId)){
      location.categories.pull(req.params.categoryId)
      await location.save()
      res.status(200).json(location)
    } else{
      throw new Error(`Could not find either program or category or category already in categories array`)
    }
  } catch (error) {
    res.status(404).json({
      err:error.message
    })
  }
})

// @desc    Delete Location and remove location from programs
// @route   DELETE /api/location/:id/:programId
// @access  Private
const deleteLocation = asyncHandler(async (req,res)=>{
  try {
    const location = await Location.findById(req.params.id)
    if(location){
      await location.remove({_id: req.params.id})
      await Program.updateMany({locations:req.params.id},{$pull:{locations:req.params.id}})
      
      res.status(200).json({})
    } else{
      throw new Error(`Could not find a location with the id ${req.params.id}`)
    }
  } catch (error) {
    res.status(404).json({
      err:error.message
    })
  }
})



export {
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
}