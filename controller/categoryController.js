import {Category} from '../model/categoryModel.js'
import { Product } from '../model/productModel.js';

export const addCategory = async (req, res) => {
  try 
  {
    const { categoryName, categoryDescription } = req.body;
    const smallCategoryName = categoryName.toLowerCase()

    const doesExist = await Category.findOne({ categoryName:smallCategoryName })
    if (doesExist) {
      return res.status(400).json({success:true ,message: "Category already exists" });
    }

    const newCategory = new Category({ categoryName, categoryDescription })
    await newCategory.save();
    res.status(201).json({success:true,newCategory,message: "Category Added Successfully !" });
  } 
  catch(error) 
  {
    console.error("Error in addCategory Route", error);
    res.status(500).json({success:false ,error:error.message,message: "Internal Server Error!" });
  }
}

export const getAllCategories = async (req,res) => {
    try 
    {
        const categories = await Category.find()
        res.json({success:true,categories})
    } 
    catch(error) 
    {
        console.error("Error in getAllCategories Route", error);
        res.status(500).json({success:false ,error:error.message,message: "Internal Server Error!" });
    }
}

export const deleteCategory = async (req,res) => {
    try
    {
        const category = await Category.findById(req.params.id)
        if(!category){
            return res.status(404).json({success:true,message: 'Category not found!' })
        }

        const categoryInUse = await Product.exists({category : category.categoryName})
        if(categoryInUse){
            return res.status(400).json({success:true,message: 'Cannot delete this category associated with products!' });
        }
        
        await Category.findByIdAndDelete(req.params.id)
        res.json({success:true,message: 'Category deleted successfully' })
    }
    catch(error)
    {
        console.error("Error in deleteCategory Route",error)
        res.status(500).json({success:false,error:error.message,message: 'Internal Server Error!' })
    }
}

export const updateCategory = async (req,res) => {
    try
    {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!category){
            return res.status(404).json({success:true,message: 'Category not found !' })
        }
        res.json({success:true,category})
    }
    catch(error)
    {
        console.error("Error in updateCategory Route",error)
        res.status(500).json({success:false,error:error.message,message: 'Internal Server Error!' })
    }
}