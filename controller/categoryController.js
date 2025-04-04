import {Category} from '../model/categoryModel.js'
import { Product } from '../model/productModel.js';

export const addCategory = async (req, res) => {
  try 
  {
    const { categoryName, categoryDescription } = req.body;

    const doesExist = await Category.findOne({ categoryName });
    if (doesExist) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ categoryName, categoryDescription })
    await newCategory.save();
    res.status(201).json({ newCategory , message: "Category Added Successfully !" });
  } 
  catch(error) 
  {
    console.error("Error in addCategory Route", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export const getAllCategories = async (req,res) => {
    try 
    {
        const categories = await Category.find()
        res.json(categories);
    } 
    catch(error) 
    {
        console.error("Error in getAllCategories Route", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const deleteCategory = async (req,res) => {
    try
    {
        const category = await Category.findById(req.params.id)
        if(!category){
            return res.status(404).json({ message: 'Category not found!' })
        }

        const categoryInUse = await Product.exists({category : category.categoryName})
        if(categoryInUse){
            return res.status(400).json({ message: 'Cannot delete this category associated with products!' });
        }
        
        await Category.findByIdAndDelete(req.params.id)
        res.json({ message: 'Category deleted successfully' })
    }
    catch(error)
    {
        console.error("Error in deleteCategory Route",error)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}

export const updateCategory = async (req,res) => {
    try
    {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!category){
            return res.status(404).json({ message: 'Category not found !' })
        }
        res.json(category)
    }
    catch(error)
    {
        console.error("Error in updateCategory Route",error)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}