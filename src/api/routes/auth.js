import { Router } from 'express';
import {
  changePassword,
  deleteUser,
  getUser,
  forgotPassword,
  login,
  logout,
  refreshToken,
  register,
  sendVerificationCode,
  verifyEmail,
} from '../controllers/auth/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/verify/:confirmCodeToken', verifyEmail);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', auth, forgotPassword);
router.post('/send-verification-code', sendVerificationCode);
router.post('/change-password', auth, changePassword);
router.get('/refresh', auth, getUser);
router.delete('/delete', auth, deleteUser);

export default router;
