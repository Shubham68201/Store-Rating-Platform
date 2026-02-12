import { HiStar } from 'react-icons/hi';

const StarRating = ({ rating = 0, onRate, interactive = false, size = 'text-xl' }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => interactive && onRate && onRate(star)}
                    disabled={!interactive}
                    className={`star-btn ${size} ${star <= rating
                            ? 'text-yellow-400'
                            : 'text-slate-600'
                        } ${interactive ? 'cursor-pointer hover:text-yellow-300' : 'cursor-default'}`}
                >
                    <HiStar />
                </button>
            ))}
        </div>
    );
};

export default StarRating;
