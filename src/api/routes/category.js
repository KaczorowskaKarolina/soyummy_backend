import { Router } from 'express';
import {
  getCategories,
  getRecipesByCategory,
} from '../controllers/category/index.js';
// import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// CATEGORY
router.get('/', getCategories);
// router.get('/category', auth, getCategories);
router.get('/:recipeId', getRecipesByCategory);
// router.get('/category/:recipeId', auth, getRecipesByCategory);

export default router;
