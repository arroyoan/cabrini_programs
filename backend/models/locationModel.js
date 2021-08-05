import mongoose from 'mongoose'
import geocoder from '../middleware/getGeoJSON.js'

const locationSchema = mongoose.Schema({
  locationName:{
    type:String,
    required: [true,'Please add a name to this location!'],
    unique: [true,'This location already exists!']
  },
  locationWebsite:{
    type: String,
  },
  programs: [{type:mongoose.Schema.ObjectId, ref:'Program'}],
  GeoJson:{},
  locationAddress: {
    type: String
  },
  updateAddress:{
    type: Boolean,
    default: false
  },
  categories:[{type:mongoose.Schema.ObjectId, ref:'Category'}]
})

// model functions
locationSchema.pre('save',async function(next){
  if(this.GeoJson === undefined || (this.updateAddress && this.locationAddress !== undefined)){
    const res = await geocoder.geocode(this.locationAddress)
    this.GeoJson = res[0]
    this.locationAddress = undefined
    this.updateAddress = false
  } 
  next()
})

const Location = mongoose.model('Location',locationSchema)

export default Location