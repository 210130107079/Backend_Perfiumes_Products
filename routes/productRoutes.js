import express from 'express'
// import userAuth from '../middleware/userAuth.js'
import { addProduct, deleteProduct, getAllProducts, getProductById , setProductStatus, updateProductInfoById, updateProductMultiImagesById } from '../controller/productController.js'
import upload from '../middleware/multer.js'
import userAuth from '../middleware/userAuth.js'

const router = express.Router()

router.post('/add',userAuth,upload.array('images',5),addProduct)
router.post('/:id/update-body',updateProductInfoById)
router.get('/get-all',userAuth,getAllProducts)
router.get('/:id/get',getProductById)
router.get('/:id/delete',deleteProduct) 
router.put('/:id/update-images',upload.array('images',5),updateProductMultiImagesById)
router.put('/:id/status-change',setProductStatus)

export default router