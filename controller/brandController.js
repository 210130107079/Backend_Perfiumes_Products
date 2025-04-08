import {Brand} from '../model/brandModel.js'
import { Product } from '../model/productModel.js'

export const addBrand = async (req,res) => {
    try
    {
        const { brandName , brandDescription } = req.body
        const smallBrandName = brandName.toLowerCase()
        const doesExist = await Brand.findOne({brandName:smallBrandName})
        if(doesExist){
            return res.status(400).json({success:true, message: 'Brand already exists' })
        }
        const newBrand = new Brand({brandName:smallBrandName,brandDescription})
        await newBrand.save()
        res.status(201).json({success:true,newBrand , message:"Brand Added Successfully !"})
    }
    catch(error)
    {
        console.error("Error in addBrand Route",error)
        res.status(500).json({success:false,error:error.message ,message: 'Internal Server Error!' })
    }
}

export const getAllBrands = async (req,res) => {
    try
    {
        const brands = await Brand.find()
        res.json({success:true,brands})
    }
    catch(error)
    {
        console.error("Error in getAllBrands Route",error)
        res.status(500).json({success:false,error:error.message, message: 'Internal Server Error!' })
    }
}

export const deleteBrand = async (req,res) => {
    try
    {

        const brand = await Brand.findById(req.params.id)
        if(!brand){
            return res.status(404).json({success:true, message: 'Brand not found!' })
        }

        const brandInUse = await Product.exists({brand:brand.brandName})
        if(brandInUse){
            return res.status(400).json({ message: 'Cannot delete this Brand associated with Products !' });
        }

        await Brand.findByIdAndDelete(req.params.id)

        res.json({success:true, message: 'Brand deleted successfully' })
    }
    catch(error)
    {
        console.error("Error in deleteBrand Route",error)
        res.status(500).json({success:false,error:error.message, message: 'Internal Server Error!' })
    }
}

export const updateBrand = async (req,res) => {
    try
    {
        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!brand){
            return res.status(404).json({success:true, message: 'Brand not found !' })
        }
        res.json({success:true,brand})
    }
    catch(error)
    {
        console.error("Error in updateBrand Route",error)
        res.status(500).json({success:false,error:error.message ,message: 'Internal Server Error!' })
    }
}