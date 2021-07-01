import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  categoryName:{
    type: String,
    unique:[true,"This Category already exists!"],
    required: [true,"Please Pick a Category"]
  }
})

const Category = mongoose.model('Category',categorySchema);

// functions

export default Category