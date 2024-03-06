import { Router } from 'express';
import {
  addToFavorites,
  deleteFromFavorites,
  getOneRecipe,
  getPopular,
  getRecipes,
} from '../controllers/recipe/index.js';
// import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// CATEGORY
router.get('/', getRecipes);
// router.get('/category', auth, getRecipes);
router.get('/popular', getPopular);
// router.get('/popular', auth, getPopular);
router.post('/favorites/:recipeId', addToFavorites);
// router.post('/favorites', auth, addToFavorites);
router.delete('/favorites/:recipeId', deleteFromFavorites);
// router.delete('/favorites/:recipeId', auth, deleteFromFavorites);
router.get('/:recipeId', getOneRecipe);
// router.get('/:recipeId', auth, getOneRecipe);

export default router;
