import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  categoryName:{
    type: String,
    required: [true,"Please add a Category Name"]
  }
})

const categoryModel = mongoose.model('Category',categorySchema);

// functions

export default categoryModel