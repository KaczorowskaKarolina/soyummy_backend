import { Router } from 'express';
import {
  addToFavorites,
  deleteFromFavorites,
  getOneRecipe,
  getPopular,
  getRecipes,
  getFavorites,
} from '../controllers/recipe/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

// CATEGORY
// router.get('/', getRecipes);
router.get('/', auth, getRecipes);
// router.get('/popular', getPopular);
router.get('/popular', auth, getPopular);
// router.get('/favorites/', getFavorites);
router.get('/favorites', auth, getFavorites);
// router.post('/favorites/:recipeId', addToFavorites);
router.post('/favorites/:recipeId', auth, addToFavorites);
// router.delete('/favorites/:recipeId', deleteFromFavorites);
router.delete('/favorites/:recipeId', auth, deleteFromFavorites);
// router.get('/:recipeId', getOneRecipe);
router.get('/:recipeId', auth, getOneRecipe);

export default router;
