import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandName:{
        type:String,
        required:true,
        unique:true,
    },
    brandDescription:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Brand = mongoose.model("Brand", brandSchema)