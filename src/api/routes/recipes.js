import { Router } from 'express';
import {
  addToFavorites,
  deleteFromFavorites,
  getOneRecipe,
  getPopular,
  getRecipes,
  getFavorites,
  getRecipesByIngredient,
  getRecipesByCategory,
  getIngredients,
  getCategories,
  getRecipesMainPage,
} from '../controllers/recipes/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

router.get('/search', auth, getRecipes);
router.get('/main-page', auth, getRecipesMainPage);
router.get('/category-list', auth, getCategories);
router.get('/popular-recipe', auth, getPopular);
router.get('/favorites', auth, getFavorites);
router.post('/favorites/:recipeId', auth, addToFavorites);
router.delete('/favorites/:recipeId', auth, deleteFromFavorites);
router.get('/ingredients/list', auth, getIngredients);
router.get('/category/:category', auth, getRecipesByCategory);
router.get('/ingredients/:ingredientId', auth, getRecipesByIngredient);
router.get('/:recipeId', auth, getOneRecipe);

// router.get('/ingredients/:id', auth, getIngredientById);

export default router;
