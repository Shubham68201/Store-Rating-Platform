import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStores, updateStoreRating, getStoreReviews, clearReviews } from '../../features/storeSlice';
import { submitRating } from '../../features/ratingSlice';
import StarRating from '../../components/StarRating';
import { HiOutlineSearch, HiOutlineLocationMarker, HiOutlineX } from 'react-icons/hi';
import { HiOutlineBuildingStorefront, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const StoreItem = ({ store, onRate, onOpenReviews }) => {
    const [rating, setRating] = useState(store.userRating || 0);
    const [review, setReview] = useState(store.userReview || '');
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setRating(store.userRating || 0);
        setReview(store.userReview || '');
        setIsDirty(false);
    }, [store.userRating, store.userReview]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setIsDirty(true);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
        setIsDirty(true);
    };

    const handleSubmit = () => {
        onRate(store._id, rating, review);
        setIsDirty(false);
    };

    return (
        <div className="glass-card p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            {/* Store header */}
            <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <HiOutlineBuildingStorefront className="text-xl text-white" />
                </div>
                <div className="min-w-0 flex-grow">
                    <h3 className="font-semibold text-white truncate">{store.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        <HiOutlineLocationMarker />
                        <span className="truncate">{store.address || 'No address'}</span>
                    </div>
                </div>
            </div>

            {/* Overall rating */}
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <p className="text-xs text-slate-500 mb-1">Overall Rating</p>
                    <div className="flex items-center gap-2">
                        <StarRating rating={Math.round(store.averageRating)} size="text-lg" />
                        <span className="text-lg font-bold text-white">{store.averageRating?.toFixed(1) || '0.0'}</span>
                    </div>
                </div>
                <button onClick={() => onOpenReviews(store._id, store.name)} className="btn btn-xs btn-ghost text-indigo-400">
                    <HiOutlineChatBubbleLeftRight /> Reviews
                </button>
            </div>

            {/* User's rating and review */}
            <div className="mt-auto pt-4 border-t border-base-300">
                <p className="text-xs text-slate-500 mb-2">
                    {store.userRating ? 'Your Rating & Review' : 'Rate this store'}
                </p>
                <div className="flex flex-col gap-3">
                    <StarRating
                        rating={rating}
                        onRate={handleRatingChange}
                        interactive
                        size="text-2xl"
                    />
                    <textarea
                        placeholder="Write a review (optional)..."
                        className="textarea textarea-bordered textarea-xs w-full bg-base-300/50 focus:bg-base-300 transition-colors"
                        value={review}
                        onChange={handleReviewChange}
                        maxLength={500}
                    ></textarea>

                    <button
                        onClick={handleSubmit}
                        disabled={!isDirty && (rating === (store.userRating || 0) && review === (store.userReview || ''))}
                        className={`btn btn-sm w-full ${isDirty ? 'btn-primary' : 'btn-ghost text-slate-500 bg-base-300/50'}`}
                    >
                        {store.userRating ? 'Update Review' : 'Submit Review'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const StoreList = () => {
    const dispatch = useDispatch();
    const { stores, isLoading, currentStoreReviews, reviewsLoading } = useSelector((state) => state.stores);
    const [search, setSearch] = useState({ name: '', address: '' });
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoreName, setSelectedStoreName] = useState('');

    useEffect(() => {
        dispatch(getStores({ sortBy, order: sortOrder }));
    }, [dispatch, sortBy, sortOrder]);

    const handleSearch = () => {
        dispatch(getStores({ ...search, sortBy, order: sortOrder }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleRate = async (storeId, rating, review) => {
        // Validation: Rating is required (min 1)
        if (rating === 0) {
            toast.error('Please select a star rating');
            return;
        }

        const result = await dispatch(submitRating({ storeId, rating, review }));
        if (!result.error) {
            toast.success(result.payload.message);
            dispatch(updateStoreRating({ storeId, rating, review }));
            // We don't need to refresh the whole list strictly, but it updates the average rating
            dispatch(getStores({ ...search, sortBy, order: sortOrder }));
        } else {
            toast.error(result.payload || 'Failed to submit rating');
        }
    };

    const openReviews = (storeId, storeName) => {
        setSelectedStoreName(storeName);
        dispatch(getStoreReviews(storeId));
        setIsModalOpen(true);
    };

    const closeReviews = () => {
        setIsModalOpen(false);
        dispatch(clearReviews());
    };

    return (
        <div className="p-6 page-enter relative">
            <h1 className="text-3xl font-bold gradient-text mb-6">Browse Stores</h1>

            {/* Search */}
            <div className="glass-card p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input value={search.name} onChange={(e) => setSearch({ ...search, name: e.target.value })} onKeyDown={handleKeyDown}
                        className="input input-sm input-bordered bg-base-300/50 border-base-300" placeholder="Search by name" />
                    <input value={search.address} onChange={(e) => setSearch({ ...search, address: e.target.value })} onKeyDown={handleKeyDown}
                        className="input input-sm input-bordered bg-base-300/50 border-base-300" placeholder="Search by address" />
                    <button onClick={handleSearch} className="btn btn-sm btn-primary">
                        <HiOutlineSearch /> Search
                    </button>
                </div>
                <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-slate-400">Sort by:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                        className="select select-xs select-bordered bg-base-300/50 border-base-300">
                        <option value="createdAt">Newest</option>
                        <option value="name">Name</option>
                        <option value="averageRating">Rating</option>
                    </select>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
                        className="select select-xs select-bordered bg-base-300/50 border-base-300">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-primary"></span></div>
            ) : stores.length === 0 ? (
                <div className="glass-card p-12 text-center text-slate-400">
                    <HiOutlineBuildingStorefront className="text-5xl mx-auto mb-3 opacity-50" />
                    <p className="text-lg">No stores found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.map((store) => (
                        <StoreItem
                            key={store._id}
                            store={store}
                            onRate={handleRate}
                            onOpenReviews={openReviews}
                        />
                    ))}
                </div>
            )}

            {/* Reviews Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="glass-card w-full max-w-lg max-h-[80vh] flex flex-col p-0 overflow-hidden animate-scale-in">
                        <div className="p-4 border-b border-base-300 flex justify-between items-center bg-base-300/30">
                            <h3 className="font-bold text-lg text-white">Reviews for {selectedStoreName}</h3>
                            <button onClick={closeReviews} className="btn btn-sm btn-ghost btn-circle text-slate-400 hover:bg-base-300/50">
                                <HiOutlineX className="text-xl" />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto flex-grow space-y-4 custom-scrollbar">
                            {reviewsLoading ? (
                                <div className="flex justify-center py-8"><span className="loading loading-spinner text-primary"></span></div>
                            ) : currentStoreReviews.length === 0 ? (
                                <p className="text-center text-slate-500 py-8">No reviews yet. Be the first!</p>
                            ) : (
                                currentStoreReviews.map((review) => (
                                    <div key={review._id} className="bg-base-300/30 p-4 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                                                {review.user?.name?.charAt(0) || '?'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{review.user?.name || 'Anonymous'}</p>
                                                <div className="flex items-center gap-1">
                                                    <StarRating rating={review.rating} size="text-xs" />
                                                    <span className="text-xs text-slate-400">• {new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {review.review && (
                                            <p className="text-sm text-slate-300 pl-11 italic">"{review.review}"</p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreList;
