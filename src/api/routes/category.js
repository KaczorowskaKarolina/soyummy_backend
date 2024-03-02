import { Router } from 'express';
import {
  getCategories,
  getRecipesByCategory,
} from '../controllers/category/index.js';
// import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// CATEGORY
router.get('/getCategories', getCategories);
// router.get('/getCategories', auth, getCategories);
router.get('/getRecipesByCategory', getRecipesByCategory);
// router.get('/getRecipesByCategory', auth, getRecipesByCategory);

export default router;
