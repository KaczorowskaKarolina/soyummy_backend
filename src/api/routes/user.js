import { Router } from 'express';
import {
  changePassword,
  deleteUser,
  editUser,
  forgotPassword,
  getUser,
  login,
  logout,
  refreshToken,
  register,
  sendVerificationCode,
  verifyEmail,
  addProduct,
  addRecipe,
  getShoppingList,
  getUsersRecipes,
  removeProduct,
  removeRecipe,
} from '../controllers/user/index.js';
import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/verify/:confirmCodeToken', verifyEmail);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', auth, forgotPassword);
router.post('/send-verification-code', sendVerificationCode);

// EDIT
router.post('/change-password', auth, changePassword);
router.put('/', auth, imageUpload, editUser);

router.get('/', auth, getUser);
router.delete('/', auth, deleteUser);

// FUNCTIONALITY
router.get('/shopping', getShoppingList);
// router.get('/shopping', auth,  getShoppingList);
router.post('/shopping', addProduct);
// router.post('/shopping', auth, addProduct);
router.delete('/shopping/:idProduct', removeProduct);
// router.delete('/shopping/:idProduct', auth, removeProduct);
router.get('/ownRecipes', getUsersRecipes);
// router.get('/ownRecipes', auth, getUsersRecipes);
router.post('/ownRecipes', addRecipe);
// router.post('/ownRecipes', auth, addRecipe);
router.delete('/ownRecipes/:recipeId', removeRecipe);
// router.delete('/ownRecipes', auth, removeRecipe);

export default router;
