import express from 'express';
import {
  signup,
  login,
  logout,
  getMe,
  updatePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import {
  validateUser,
  validateLogin,
  validatePasswordUpdate,
} from '../middleware/validate.js';

const router = express.Router();

router.post('/signup', validateUser, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/update-password', protect, validatePasswordUpdate, updatePassword);

export default router;
