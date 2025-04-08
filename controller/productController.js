import {Product} from '../model/productModel.js'
import fs from 'fs'
import path from 'path'

export const addProduct = async (req,res) => {
    try
    {
        if(req.user === "admin"){
            const { productName,category,brand,price } = req.body

            if(!productName || !category || !brand || !price){
                return res.status(400).json({success:true,message: 'All fields are required!' })
            }

            const filePaths = req.files.map(file => file.path.replace(/\\/g, "/"))
            if(!filePaths){
                return res.status(400).json({success:true,message: 'No images provided!' })
            }

            const product = await Product.create({ productName, category, brand, price, images: filePaths });

            res.status(201).json({success:true,message: 'Product added successfully', product })
        }else{
            return res.status(403).json({success:true,error:error.message,message: 'You are not authorized to add products !' })
        }
    }
    catch(error)
    {
        console.error("Error in Add Product Route",error)
        res.status(500).json({ message: 'Internal Server Error !', })
    }
}

export const getAllProducts = async (req,res) => {
    try
    {
        const {sortBy,search} = req.query
        const page = req.query.page
        let filterOption = {}
        let sortOption = {}

        if(sortBy){
            if(sortBy === 'ascending'){
                sortOption.price = 1
            }else if(sortBy === 'descending'){
                sortOption.price = -1
            }
        }
        if(search){
            filterOption.$or=[
                { productName: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ]
        }

        if(!req.user){
            return res.status(403).json({success:true,message: 'You are not authorized to view products !' })
        }
        if(req.user === 'admin'){
            const productsAdmin = await Product.paginate(filterOption,{limit:2,page:page,sort:sortOption, populate:[
                { path: 'brand', select: 'brandName' },
                { path: 'category', select: 'categoryName' }
            ]})
            res.json({success:true,productsAdmin})
        }
        else{
            const productsManager = await Product.paginate({status:true}).sort(sortOption)
            res.json({success:true,productsManager})
        }
    }
    catch(error)
    {
        console.error("Error in Get All Products Route",error)
        res.status(500).json({success:false,error:error.message,message: 'Internal Server Error!', })
    }
}

export const getProductById = async (req,res) => {
    try
    {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({success:true,message: 'Product not found!' })
        }
        res.json(product)
    }
    catch(error)
    {
        console.error("Error in Get Product By Id Route",error)
        res.status(500).json({success:false,error:error.message,message: 'Internal Server Error!', })
    }
}

export const updateProductInfoById = async (req, res) => {
    try
    {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if(!product){
            return res.status(404).json({ message: 'Product not found!' })
        }
        res.json({success:true,product,message:"Product Body updated Successfully !"})
    }
    catch(error)
    {
        console.error("Error in Update Product Info By Id Route",error)
        res.status(500).json({success:false,error:error.message,message: 'Internal Server Error!', })
    }  
}

export const deleteProduct = async (req,res) => {
    try
    {
        const productId = req.params.id
        const product = await Product.findByIdAndDelete(productId)
        if(!product){
            return res.status(404).json({success:true,message: 'Product not found !' })
        }
        res.json({success:true,message:"Product deleted successfully !"})
    }
    catch(error)
    {
        console.error("Error in Delete Product Route",error)
        res.status(500).json({success:false,error:error.message,message: 'Internal Server Error!', })
    }
}

export const updateProductMultiImagesById = async (req, res) => {
    try 
    {
        const productId = req.params.id;
        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({success:true,message: 'Product not found!' })
        }
        const productImagesArray = await Product.findById(productId).select('images')
        const deletedImages = req.body.deletedImages ? JSON.parse(req.body.deletedImages) : []
        const filePaths = req.files.map(file => file.path.replace(/\\/g, "/"))

        if(productImagesArray.images.length === 5 && deletedImages.length === 0) {
            return res.status(400).json({success:true,message: 'Cannot upload more than 5 images!' })
        }else
        {

            await Promise.all(deletedImages.map(async (image) => {
                const imagePath = path.join(process.cwd(), image)
                try {
                    await fs.promises.unlink(imagePath);
                    product.images = product.images.filter(img => img !== image)
                } catch (error) {
                    console.error("Error deleting image", error);
                }
            }));

            product.images.push(...filePaths)

            await product.save();
            res.json({success:true,product,message: "Product images updated Successfully!" });
        }

    } 
    catch(error) 
    {
        console.error("Error in Update Product Multi Images By Id Route", error);
        res.status(500).json({success:false,error:error.message,message: 'Internal Server Error!' });
    }
}

export const setProductStatus = async (req,res) => {
    try
    {
        const productId = req.params.id

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({success:true,message: 'Product not found!' })
        }
        product.status =!product.status
        await product.save()
        res.json({success:true, product, message: `Product status changed to ${product.status}!` })
    }
    catch(error)
    {
        console.error("Error in Set Product Status Route",error)
        res.status(500).json({success:false,error:error.message,message: 'Internal Server Error!', })
    }
}