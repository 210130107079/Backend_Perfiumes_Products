import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    images:{
        type:Array,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})

export const Product = mongoose.model("Product", productSchema)