import express from 'express';
import {
  getDashboard,
  getUsers,
  getUserById,
  addUser,
  getStores,
  addStore,
  updateUser,
  updateStore,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateUser, validateStore } from '../middleware/validate.js';

const router = express.Router();

// All admin routes are protected and require ADMIN role
router.use(protect, authorize('ADMIN'));

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', validateUser, addUser);
router.put('/users/:id', updateUser);
router.get('/stores', getStores);
router.post('/stores', validateStore, addStore);
router.put('/stores/:id', updateStore);

export default router;
