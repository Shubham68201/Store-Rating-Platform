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
    const avgRating = parseFloat(stats[0].avgRating.toFixed(1));
    const totalRatings = stats[0].total;
    
    await Store.findByIdAndUpdate(storeId, {
      averageRating: avgRating,
      totalRatings: totalRatings,
    });
    
    return {
      averageRating: avgRating,
      totalRatings: totalRatings,
    };
  } else {
    await Store.findByIdAndUpdate(storeId, {
      averageRating: 0,
      totalRatings: 0,
    });
    return {
      averageRating: 0,
      totalRatings: 0,
    };
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

    const updatedStats = await updateStoreAverage(storeId);

    res.json({
      success: true,
      message: existingRating
        ? 'Rating updated successfully'
        : 'Rating submitted successfully',
      stats: updatedStats,
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

    // Recalculate to ensure fresh data
    await updateStoreAverage(storeId);
    const updatedStore = await Store.findById(storeId);

    res.json({
      store: {
        _id: updatedStore._id,
        name: updatedStore.name,
        email: updatedStore.email,
        averageRating: updatedStore.averageRating || 0,
        totalRatings: updatedStore.totalRatings || 0,
      },
      ratings,
      totalRatings: updatedStore.totalRatings || 0,
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

    // Get the actual count from ratings array as backup
    const actualCount = ratings.length;

    // Recalculate to ensure accuracy
    await updateStoreAverage(store._id);
    
    // Fetch updated store data
    const updatedStore = await Store.findById(store._id);

    res.json({
      store: {
        _id: updatedStore._id,
        name: updatedStore.name,
        email: updatedStore.email,
        averageRating: updatedStore.averageRating || 0,
        totalRatings: updatedStore.totalRatings || actualCount,
      },
      ratings,
      totalRatings: updatedStore.totalRatings || actualCount,
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

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const ratings = await Rating.find({ store: storeId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({
      ratings,
      averageRating: store.averageRating || 0,
      totalRatings: store.totalRatings || ratings.length,
    });
  } catch (error) {
    next(error);
  }
};

export { submitOrUpdateRating, getStoreRatings, getMyStoreRatings, getPublicStoreRatings };