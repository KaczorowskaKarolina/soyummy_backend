import { Router } from 'express';
import {
  getCategories,
  getRecipesByCategory,
} from '../controllers/category/index.js';
// import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// CATEGORY
router.get('/', getCategories);
// router.get('/', auth, getCategories);
router.get('/:category', getRecipesByCategory);
// router.get('/category/:category', auth, getRecipesByCategory);

export default router;
