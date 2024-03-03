import { Router } from 'express';
import {
  getCategories,
  getRecipesByCategory,
} from '../controllers/category/index.js';
// import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// CATEGORY
router.get('/category', getCategories);
// router.get('/category', auth, getCategories);
router.get('/category/:recipeId', getRecipesByCategory);
// router.get('/category/:recipeId', auth, getRecipesByCategory);

export default router;
