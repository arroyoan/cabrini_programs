import Program from '../models/programModel.js'
import Location from '../models/locationModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Gets all programs
// @route   GET /api/v1/programs/
// @access  Public
const getAllPrograms = asyncHandler(async (req,res)=>{
  try {
    const documentCount = await Program.countDocuments({})
    const programs = await Program.find({})
    res.status(200)
      .json({
        documentCount,
        programs
      })
  } catch (error) {
    console.error(error)
    res.send(error)
  }
})

// @desc    Gets Single program and populates locations
// @route   GET /api/v1/programs/:id
// @access  Public
const getSingleProgram = asyncHandler(async (req,res)=>{
  try {
    const program = await Program.findById(req.params.id).populate({path:'locations',select:'_id locationName'})
    if(program){
      res.status(200).json(
        program
      )
    }
    else {
      throw new Error(`Could not find program with id ${req.params.id}`)
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({
      err:error.message
    })
  }
})

// @desc    Creates a new program
// @route   POST /api/v1/programs/
// @access  Private/Admin
const createProgram = asyncHandler(async (req,res)=>{
  try {
    // pulls all the user entries from the req
    const {
      programName,
      programPhone,
      programEmail,
      programWebsite,
      partnershipInfo,
      campusAffiliation,
      description
    } = req.body

    // check if the program already exists
    const programCheck = await Program.findOne({programName})
    if(!programCheck){
      // create the new program
      const program = new Program({
        programName,
        programPhoneNumber:programPhone,
        programEmail,
        programWebsite,
        description,
        partnershipInfo,
        campusAffiliation
      })
      
      // save the new program to the database
      await program.save()

      // send 201 status back with program data
      res.status(201)
        .json(program)
    } 
    else{
      throw new Error(`A program with the name ${programName} already exists!`)
    }

  } catch (error) {
    console.error(error.message)
    res.json({
      err: error.message
    })
  }
  
})

// @desc    Update Program Information
// @route   PUT /api/v1/programs/:id
// @access  Public
const updateProgram = asyncHandler(async (req,res)=>{
  try {
    const program = await Program.findById(req.params.id)
    if(program){
      program.programName= req.body.programName || program.programName
      program.programPhone= req.body.programPhone || program.programPhone
      program.programEmail= req.body.programEmail || program.programEmail
      program.programWebiste= req.body.programWebiste || program.programWebiste
      program.partnershipInfo= req.body.partnershipInfo || program.partnershipInfo
      program.campusAffiliation= req.body.campusAffiliation || program.campusAffiliation
      program.description= req.body.description || program.description  
      
      const updatedProgram = await program.save()
      res.status(200).json(
        updatedProgram
      )

    }else{
      throw new Error(`Could not find program with id ${req.params.id}`)
    }
  } catch (error) {
    res.status(404).json({
      err:error.message
    })
  }
})

// @desc    Add a location
// @route   PUT /api/v1/programs/:id/:locationId
// @access  Public
const addLocation = asyncHandler(async (req,res)=>{
  try {
    const program = await Program.findById(req.params.id)
    const location = await Location.findById(req.params.locationId)
    if(program && location && !program.locations.includes(location._id)){
      program.locations.push(location._id)
      const updatedProgram = await program.save()
      res.status(200).json(
        updatedProgram
      )
    } else {
      throw new Error('Couldnt find the location or program provided')
    }
  } catch (error) {
    res.status(404).json({
      err:error.message
    })    
  }

})

// @desc    Remove a location
// @route   DELETE /api/v1/programs/:id/:locationId
// @access  Public
const removeLocation = asyncHandler( async (req,res)=>{
  try {
    const program = await Program.findById(req.params.id)
    if(program && program.locations.includes(req.params.locationId)){
      program.locations.pull(req.params.locationId)
      const updatedProgram = await program.save()
      res.status(200).json(
        updatedProgram
      )
    } 
    else{
      throw new Error(`Could not find program or the program did not have this location`)
    }
  } catch (error) {
    res.status(404).json({
      err: error.message
    })
  }
})

// @desc    Delte Program
// @route   DELETE /api/v1/programs/:id
// @access  Public
const deleteProgram = asyncHandler( async (req,res)=>{
  try {
    const program = await Program.findById(req.params.id)
    if(program){
      await program.remove({_id:req.params.id})
      await Location.updateMany({programs:req.params.id},{$pull: {programs:req.params.id}})

      res.status(200).json({})
    } else{
      throw new Error(`Could not find program with id ${req.params.id}`)
    }
  } catch (error) {
    console.error(error)
    res.status(404).json(
      {err:error.message}
    )
  }
})

export {
  getAllPrograms,
  getSingleProgram,
  createProgram,
  updateProgram,
  addLocation,
  removeLocation,
  deleteProgram
}