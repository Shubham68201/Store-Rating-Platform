import express from 'express';
import {
  submitOrUpdateRating,
  getStoreRatings,
  getMyStoreRatings,
  getPublicStoreRatings,
} from '../controllers/ratingController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRating } from '../middleware/validate.js';

const router = express.Router();

// Public route
router.get('/public/:storeId', getPublicStoreRatings);

router.use(protect);

// Normal user submits/updates rating
router.post('/:storeId', authorize('USER'), validateRating, submitOrUpdateRating);

// Store owner gets their store's ratings
router.get('/my-store', authorize('OWNER'), getMyStoreRatings);

// Get ratings for a specific store
router.get('/store/:storeId', getStoreRatings);

export default router;
