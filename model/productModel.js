import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    status:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})

productSchema.plugin(mongoosePaginate)

export const Product = mongoose.model("Product", productSchema)