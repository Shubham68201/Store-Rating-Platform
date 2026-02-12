import { body, validationResult } from 'express-validator';

// Handle validation results
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }
    next();
};

// Signup / Add User validation
const validateUser = [
    body('name')
        .trim()
        .isLength({ min: 20 })
        .withMessage('Name must be at least 20 characters')
        .isLength({ max: 60 })
        .withMessage('Name must not exceed 60 characters'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .isLength({ max: 16 })
        .withMessage('Password must not exceed 16 characters')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character'),
    body('address')
        .optional()
        .isLength({ max: 400 })
        .withMessage('Address must not exceed 400 characters'),
    handleValidation,
];

// Login validation
const validateLogin = [
    body('email').trim().isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidation,
];

// Store validation
const validateStore = [
    body('name')
        .trim()
        .isLength({ min: 20 })
        .withMessage('Store name must be at least 20 characters')
        .isLength({ max: 60 })
        .withMessage('Store name must not exceed 60 characters'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('address')
        .optional()
        .isLength({ max: 400 })
        .withMessage('Address must not exceed 400 characters'),
    handleValidation,
];

// Rating validation
const validateRating = [
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    body('review')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Review cannot exceed 500 characters'),
    handleValidation,
];

// Password update validation
const validatePasswordUpdate = [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters')
        .isLength({ max: 16 })
        .withMessage('New password must not exceed 16 characters')
        .matches(/[A-Z]/)
        .withMessage('New password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('New password must contain at least one special character'),
    handleValidation,
];

export {
  validateUser,
  validateLogin,
  validateStore,
  validateRating,
  validatePasswordUpdate,
};