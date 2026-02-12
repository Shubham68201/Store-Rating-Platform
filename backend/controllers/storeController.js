import Store from '../models/Store.js';
import Rating from '../models/Rating.js';

// @desc    Get all stores (with search, sort, user's rating)
// @route   GET /api/stores
const getAllStores = async (req, res, next) => {
    try {
        const { name, address, sortBy, order } = req.query;

        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (address) filter.address = { $regex: address, $options: 'i' };

        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        } else {
            sortOptions.createdAt = -1;
        }

        const stores = await Store.find(filter).sort(sortOptions);

        // Get the current user's ratings for all stores
        let userRatings = {};
        if (req.user) {
            const ratings = await Rating.find({ user: req.user._id });
            ratings.forEach((r) => {
                userRatings[r.store.toString()] = r.rating;
            });
        }

        const storesWithUserRating = await Promise.all(stores.map(async (store) => {
            const rating = req.user ? await Rating.findOne({ user: req.user._id, store: store._id }) : null;
            return {
                _id: store._id,
                name: store.name,
                email: store.email,
                address: store.address,
                averageRating: store.averageRating,
                userRating: userRatings[store._id.toString()] || null,
                userReview: rating ? rating.review : '',
            };
        }));

        res.json(storesWithUserRating);
    } catch (error) {
        next(error);
    }
};

// @desc    Get store by ID
// @route   GET /api/stores/:id
const getStoreById = async (req, res, next) => {
    try {
        const store = await Store.findById(req.params.id).populate('owner', 'name email');
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        let userRating = null;
        if (req.user) {
            const rating = await Rating.findOne({ user: req.user._id, store: store._id });
            if (rating) userRating = rating.rating;
        }

        res.json({
            ...store.toObject(),
            userRating,
        });
    } catch (error) {
        next(error);
    }
};

export { getAllStores, getStoreById };