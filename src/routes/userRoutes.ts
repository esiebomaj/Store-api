import express from 'express';
import { createUser, loginUser } from '../controllers/userControllers';
import validators from './../utils/validators'
import validate from './../middleware/validation'

const router = express.Router();

router.post('/register', validators("emailPassword"), validate, createUser);
router.post('/login',  validators("emailPassword"), validate, loginUser);

export default router;
