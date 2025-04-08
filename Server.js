import express from 'express'
import dotenv from 'dotenv'
import connectToDB from './config/db.js'
import personRoutes from './routes/personRoutes.js'
import productRoutes from './routes/productRoutes.js'
import brandRouter from './routes/brandRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

//Initialize Express
const app = express()
const port = process.env.PORT || 8080

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Current directory: ${__dirname}`);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
)) 

// Serve static files from 'uploads' folder
const uploadsPath = path.join(__dirname, 'uploads');
console.log(`Serving static files from: ${uploadsPath}`);
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/api/users', personRoutes);
app.use('/api/product', productRoutes);
app.use('/api/brand',brandRouter)
app.use('/api/category',categoryRouter)


// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToDB()
})