import express from 'express'
import { addBrand, deleteBrand, getAllBrands, updateBrand } from '../controller/brandController.js'
import userAuth from '../middleware/userAuth.js'

const router = express.Router()

router.post('/add',addBrand)
router.post('/:id/delete',deleteBrand)
router.get('/get',getAllBrands)
router.put('/:id/update',updateBrand)

export default router