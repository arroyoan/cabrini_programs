import mongoose from 'mongoose'

const programSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: [true,'Please add a program name!'],
    unique: [true,'This program already exists!']
  },
  programPhoneNumber: {
    type: String,
    required:[true,'Please add a phone number!']
  },
  programEmail:{
    type: String,
    required:[true,'Please add an email!'],
    match:[
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
      'Please add a valid email!'
    ]
  },
  programWebsite:{
    type: String,
    match: [
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      'Please add a valid URL that starts with http or https'
    ]
  },
  partnershipInfo:  {
    partnerName: {type: String},
    partnerEmail: {
      type: String,
      match:[
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        'Please add a valid email!'
      ]
    },
    partnerPhone: {
      type: String
    },
    partnerWebsite: {
      type: String,
      match: [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
        'Please add a valid URL that starts with http or https'
      ]
    }
  },
  campusAffiliation: {
    campusBranchName: {
      type:String
    },
    campusBranchWebsite: {
      type: String,
      match: [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
        'Please add a valid URL that starts with http or https'
      ]
    },
    campusStreetAddress:{
      type: String,
    },
  },
  locations: [{type:mongoose.Schema.ObjectId, ref:'Location'}],
  // tags:{

  // },
  categories:[{type:mongoose.Schema.ObjectId, ref:'Category'}],
  description: {
      blurb:{
        type: String,
        required: [true, "Please add a short blurb!"]
      },
      services:{
        type: String
      },
      whoWeServed:{
        type: String
      },
      mission:{
        type: String
      }
  }
})

// adds an index on programName to allow for full-text search on the programsName
programSchema.index({programName:"text"})

const Program = mongoose.model('Program',programSchema);

export default Program