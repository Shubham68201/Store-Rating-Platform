import express from 'express';
import { getAllStores, getStoreById } from '../controllers/storeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllStores);
router.get('/:id', getStoreById);

export default router;
