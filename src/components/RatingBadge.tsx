import { Rating } from '@/lib/types';

interface RatingBadgeProps {
  rating: Rating;
  className?: string;
}

export default function RatingBadge({ rating, className = '' }: RatingBadgeProps) {
  const getRatingColor = (rating: Rating) => {
    switch (rating) {
      case 'Buy':
        return 'bg-primary-dark text-primary-light';
      case 'Sell':
        return 'bg-primary-dark text-primary-light';
      case 'Hold':
        return 'bg-primary-dark text-primary-light';
      default:
        return 'bg-primary-dark text-primary-light';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(
        rating
      )} ${className}`}
    >
      {rating}
    </span>
  );
}

