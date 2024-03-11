import { Router } from 'express';
import {
  addProduct,
  addRecipe,
  getShoppingList,
  getUsersRecipes,
  removeProduct,
  removeRecipe,
  newsletter,
  stopNewsletter,
  updateUser,
} from '../controllers/user/index.js';
import { auth, fileMiddleware } from '../middlewares/index.js';

const router = Router();

router.put('/edit', auth, fileMiddleware.single('avatar'), updateUser);

// FUNCTIONALITY
router.post('/subscribe', auth, newsletter);
router.delete('/subscribe', auth, stopNewsletter);
router.get('/shopping', auth, getShoppingList);
router.post('/shopping', auth, addProduct);
router.delete('/shopping/', auth, removeProduct);
router.get('/ownRecipes', auth, getUsersRecipes);
router.post(
  '/ownRecipes',
  auth,
  fileMiddleware.single('recipeImage'),
  addRecipe
);
router.delete('/ownRecipes/:recipeId', auth, removeRecipe);

export default router;
