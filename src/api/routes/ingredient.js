import { Router } from 'express';
import {
  getIngredients,
  getIngredientById,
  getRecipesByIngredient,
} from '../controllers/ingredient/index.js';
// import { auth } from '../middlewares/index.js';

const router = Router();

// CATEGORY
router.get('/', getIngredients);
// router.get('/', auth, getIngredients);
router.get('/:id', getIngredientById);
// router.get('/:id', auth, getIngredientById);
router.get('/recipe/:ingredientId', getRecipesByIngredient);
// router.get('/recipe/:ingredientId', auth, getRecipesByIngredient);

export default router;
