import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must not exceed 5'],
    },
    review: {
      type: String,
      maxlength: [500, 'Review cannot be more than 500 characters'],
      default: '',
    },
  },
  { timestamps: true }
);

// One rating per user per store
ratingSchema.index({ user: 1, store: 1 }, { unique: true });

// Static method to calculate average rating for a store
ratingSchema.statics.calculateAverageRating = async function (storeId) {
  const result = await this.aggregate([
    { $match: { store: storeId } },
    { $group: { _id: '$store', averageRating: { $avg: '$rating' } } },
  ]);

  const Store = mongoose.model('Store');

  if (result.length > 0) {
    await Store.findByIdAndUpdate(storeId, {
      averageRating: Math.round(result[0].averageRating * 10) / 10,
    });
  } else {
    await Store.findByIdAndUpdate(storeId, { averageRating: 0 });
  }
};

// Recalculate after save
ratingSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.store);
});

// Recalculate after delete
ratingSchema.post('findOneAndDelete', function (doc) {
  if (doc) {
    doc.constructor.calculateAverageRating(doc.store);
  }
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
