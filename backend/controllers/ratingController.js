import Rating from '../models/Rating.js';
import Store from '../models/Store.js';

// Helper → Recalculate average rating
const updateStoreAverage = async (storeId) => {
  const stats = await Rating.aggregate([
    { $match: { store: storeId } },
    {
      $group: {
        _id: '$store',
        avgRating: { $avg: '$rating' },
        total: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Store.findByIdAndUpdate(storeId, {
      averageRating: stats[0].avgRating.toFixed(1),
      totalRatings: stats[0].total,
    });
  } else {
    await Store.findByIdAndUpdate(storeId, {
      averageRating: 0,
      totalRatings: 0,
    });
  }
};

// @desc    Submit or update a rating for a store
// @route   POST /api/ratings/:storeId
const submitOrUpdateRating = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    let existingRating = await Rating.findOne({
      user: req.user._id,
      store: storeId,
    });

    if (existingRating) {
      existingRating.rating = rating;
      if (review !== undefined) existingRating.review = review;
      await existingRating.save();
    } else {
      await Rating.create({
        user: req.user._id,
        store: storeId,
        rating,
        review: review || '',
      });
    }

    await updateStoreAverage(storeId);

    res.json({
      success: true,
      message: existingRating
        ? 'Rating updated successfully'
        : 'Rating submitted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get ratings for a store (admin / owner dashboard)
// @route   GET /api/ratings/store/:storeId
const getStoreRatings = async (req, res, next) => {
  try {
    const { storeId } = req.params;

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const ratings = await Rating.find({ store: storeId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      store: {
        _id: store._id,
        name: store.name,
        averageRating: store.averageRating,
        totalRatings: store.totalRatings,
      },
      ratings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get store owner's ratings dashboard
// @route   GET /api/ratings/my-store
const getMyStoreRatings = async (req, res, next) => {
  try {
    const store = await Store.findOne({ owner: req.user._id });

    if (!store) {
      return res.status(404).json({ message: 'No store found for this owner' });
    }

    const ratings = await Rating.find({ store: store._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      store,
      ratings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get public ratings for store
// @route   GET /api/ratings/public/:storeId
const getPublicStoreRatings = async (req, res, next) => {
  try {
    const { storeId } = req.params;

    const ratings = await Rating.find({ store: storeId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(ratings);
  } catch (error) {
    next(error);
  }
};

export { submitOrUpdateRating, getStoreRatings, getMyStoreRatings, getPublicStoreRatings };
