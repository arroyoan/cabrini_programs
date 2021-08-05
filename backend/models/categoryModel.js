import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  categoryName:{
    type: String,
    unique:[true,"This Category already exists!"],
    required: [true,"Please Pick a Category"]
  },
  categoryType: {
    type:String,
    enum:['program','location'],
    required: [true,'Please choose if this category is for a program or location.']
  }
}) 

const Category = mongoose.model('Category',categorySchema);

// functions

export default Category