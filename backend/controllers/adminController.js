import User from '../models/User.js';
import Store from '../models/Store.js';
import Rating from '../models/Rating.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
 const getDashboard = async (req, res, next) => {
  try {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      User.countDocuments(),
      Store.countDocuments(),
      Rating.countDocuments(),
    ]);

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (filterable, sortable)
// @route   GET /api/admin/users
 const getUsers = async (req, res, next) => {
  try {
    const { name, email, address, role, sortBy, order } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };
    if (role) filter.role = role;

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const users = await User.find(filter).sort(sortOptions);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID (with store rating if OWNER)
// @route   GET /api/admin/users/:id
 const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
    };

    if (user.role === 'OWNER') {
      const store = await Store.findOne({ owner: user._id });
      if (store) {
        userData.store = {
          _id: store._id,
          name: store.name,
          averageRating: store.averageRating,
        };
      }
    }

    res.json(userData);
  } catch (error) {
    next(error);
  }
};

// @desc    Add new user (admin can set any role)
// @route   POST /api/admin/users
 const addUser = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      role: role || 'USER',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all stores (filterable, sortable)
// @route   GET /api/admin/stores
 const getStores = async (req, res, next) => {
  try {
    const { name, email, address, sortBy, order } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const stores = await Store.find(filter)
      .sort(sortOptions)
      .populate('owner', 'name email');

    res.json(stores);
  } catch (error) {
    next(error);
  }
};

// @desc    Add new store
// @route   POST /api/admin/stores
 const addStore = async (req, res, next) => {
  try {
    const { name, email, address, owner } = req.body;

    const existingStore = await Store.findOne({ email });
    if (existingStore) {
      return res.status(400).json({
        message: 'A store with this email already exists',
      });
    }

    const store = await Store.create({
      name,
      email,
      address,
      owner: owner || null,
    });

    res.status(201).json(store);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
 const updateUser = async (req, res, next) => {
  try {
    const { name, email, address, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (address !== undefined) user.address = address;
    if (role !== undefined) user.role = role;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update store
// @route   PUT /api/admin/stores/:id
 const updateStore = async (req, res, next) => {
  try {
    const { name, email, address, owner } = req.body;

    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    if (email && email !== store.email) {
      const exists = await Store.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    if (name !== undefined) store.name = name;
    if (email !== undefined) store.email = email;
    if (address !== undefined) store.address = address;
    if (owner !== undefined) store.owner = owner || null;

    await store.save();

    res.json(store);
  } catch (error) {
    next(error);
  }
};

export {getDashboard,getUsers,getUserById,addUser,getStores,addStore,updateUser,updateStore};
