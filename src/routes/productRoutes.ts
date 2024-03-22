import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, listAllProducts } from '../controllers/productControllers';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.get('/', authenticate, listAllProducts);
router.post('/', authenticate, createProduct);
router.get('/:id', authenticate, getProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
