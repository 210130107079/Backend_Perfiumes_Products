import express from 'express'
import { addCategory, deleteCategory, getAllCategories, updateCategory } from '../controller/categoryController.js'

const router = express.Router()

router.post('/add',addCategory)
router.post('/:id/delete',deleteCategory)
router.get('/get',getAllCategories)
router.put('/:id/update',updateCategory)

export default router