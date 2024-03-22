import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, listAllProducts } from '../controllers/productControllers';
import { authenticate } from '../middleware/authenticate';
import validators from './../utils/validators'
import validate from './../middleware/validation'

const router = express.Router();

router.get('/', authenticate,  listAllProducts);
router.post('/', authenticate,  validators("product"), validate, createProduct);
router.put('/:id', authenticate,  validators("product"), validate, updateProduct);
router.get('/:id', authenticate,  validators("id"), validate, getProduct);
router.delete('/:id', authenticate, validators("id"), validate, deleteProduct);

export default router;
