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
  GeoJson:{},
  locationAddress: {
    type: String
  },
  locationPhoneNumber:{
    type: String,
  },
  locationEmail:{
    type: String,
    match:[
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
      'Please add a valid email!'
    ]
  },
  contactName:{
    type:String
  },
  desc:{
    type:String
  },
  updateAddress:{
    type: Boolean,
    default: false
  },
  internship:{
    type: Boolean,
    default: false
  },
  volunteer:{
    type: Boolean,
    default: false
  },
  categories:[{type:mongoose.Schema.ObjectId, ref:'Category'}],
  programs: [{type:mongoose.Schema.ObjectId, ref:'Program'}]

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

// adds an index on locationName to allow for full-text search on the locationName
locationSchema.index({locationName:"text"})

const Location = mongoose.model('Location',locationSchema)

export default Location