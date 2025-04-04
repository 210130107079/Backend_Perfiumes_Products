import mongoose from "mongoose";

const connectToDB = async () => {
    try
    {
        mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");
    }
    catch(error)
    {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

export default connectToDB