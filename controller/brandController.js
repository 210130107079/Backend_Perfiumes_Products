import {Brand} from '../model/brandModel.js'
import { Product } from '../model/productModel.js'

export const addBrand = async (req,res) => {
    try
    {
        const { brandName , brandDescription } = req.body
        const doesExist = await Brand.findOne({brandName})
        if(doesExist){
            return res.status(400).json({ message: 'Brand already exists' })
        }
        const newBrand = new Brand({brandName,brandDescription})
        await newBrand.save()
        res.status(201).json({newBrand , message:"Brand Added Successfully !"})
    }
    catch(error)
    {
        console.error("Error in addBrand Route",error)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}

export const getAllBrands = async (req,res) => {
    try
    {
        const brands = await Brand.find()
        res.json(brands)
    }
    catch(error)
    {
        console.error("Error in getAllBrands Route",error)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}

export const deleteBrand = async (req,res) => {
    try
    {

        const brand = await Brand.findById(req.params.id)
        if(!brand){
            return res.status(404).json({ message: 'Brand not found!' })
        }

        const brandInUse = await Product.exists({brand:brand.brandName})
        if(brandInUse){
            return res.status(400).json({ message: 'Cannot delete this Brand associated with Products !' });
        }

        await Brand.findByIdAndDelete(req.params.id)

        res.json({ message: 'Brand deleted successfully' })
    }
    catch(error)
    {
        console.error("Error in deleteBrand Route",error)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}

export const updateBrand = async (req,res) => {
    try
    {
        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!brand){
            return res.status(404).json({ message: 'Brand not found !' })
        }
        res.json(brand)
    }
    catch(error)
    {
        console.error("Error in updateBrand Route",error)
        res.status(500).json({ message: 'Internal Server Error!' })
    }
}