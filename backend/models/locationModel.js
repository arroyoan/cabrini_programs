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
    match: [
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      'Please add a valid URL that starts with http or https'
    ]
  },
  programs: [{type:mongoose.Schema.ObjectId, ref:'programSchema'}],
  GeoJson:{},
  locationAddress: {
    type: String
  }
})

// model functions
locationSchema.pre('save',async function(next){
  if(this.GeoJson === undefined){
    const res = await geocoder.geocode(this.locationAddress)
    this.GeoJson = res[0]
    this.locationAddress = undefined
  }
  next()
})

const Location = mongoose.model('locationSchema',locationSchema)

export default Location