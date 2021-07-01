import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Gets all categories
// @route   GET /api/v1/categories/
// @access  Public
const getAllCategories = asyncHandler(async (req,res)=>{

})

// @desc    Gets Single Category
// @route   GET /api/v1/categories/:id
// @access  Public
const getSingleCategory = asyncHandler(async (req,res)=>{
  
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
  
})

// @desc    Delete Category
// @route   GET /api/v1/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req,res)=>{
  
})

export {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
}