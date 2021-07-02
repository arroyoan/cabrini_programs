import Category from '../models/categoryModel.js'
import Program from '../models/programModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Gets all categories
// @route   GET /api/v1/categories/
// @access  Public
const getAllCategories = asyncHandler(async (req,res)=>{
  try {
    const categories = await Category.find({})
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({
      err:error.message
    })
  }
})

// @desc    Gets Single Category
// @route   GET /api/v1/categories/:id
// @access  Public
const getSingleCategory = asyncHandler(async (req,res)=>{
  try {
    const category = await Category.findById(req.params.id)
    if(category){
      res.status(200).json(category)
    }
    else{
      throw new Error(`Could not find category with id ${req.params.id}`)
    }
  } catch (error) {
    
  }
})

// @desc    Create New Category
// @route   POST /api/v1/categories/
// @access  Private
const createCategory = asyncHandler(async (req,res)=>{
  try {
    const {categoryName} = req.body
    
    const newCategory = new Category({
      categoryName
    })

    await newCategory.save()
    res.status(201).json(newCategory)

  } catch (error) {
    res.status(400).json({
      err:error.message
    })
  }
})

// @desc    Update Category
// @route   GET /api/v1/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req,res)=>{
  try {
    const category = await Category.findById(req.params.id)
    if(category){
      category.categoryName= req.body.categoryName || category.categoryName
      const updatedCat = await category.save()

      res.status(200).json(
        updatedCat
      )
    } else{
      throw new Error(`Could not find category with id ${req.params.id}`)
    }
  } catch (error) {
    res.status(200).json({
      err:error.message
    })
  }
})

// @desc    Delete Category
// @route   GET /api/v1/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req,res)=>{
  try {
    const category = await Category.findById(req.params.id)
    if(category){
      await category.remove({_id:req.params.id})
      await Program.updateMany({categories: req.params.id}, {$pull: {categories: req.params.id}})

      res.status(200).json({})
    } else{
      throw new Error(`Could not find category with id ${req.params.id}`)
    }
  } catch (error) {
    
  }
})

export {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
}