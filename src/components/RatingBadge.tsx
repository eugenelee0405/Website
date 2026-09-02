import { Rating } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RatingBadgeProps {
  rating: Rating;
  className?: string;
}

const config: Record<Rating, { icon: typeof TrendingUp; classes: string }> = {
  Buy: { icon: TrendingUp, classes: 'text-accent-ink border-accent-ink' },
  Sell: { icon: TrendingDown, classes: 'text-ink border-line-strong' },
  Hold: { icon: Minus, classes: 'text-muted border-line' },
};

export default function RatingBadge({ rating, className = '' }: RatingBadgeProps) {
  const { icon: Icon, classes } = config[rating] ?? config.Hold;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${classes} ${className}`}
    >
      <Icon size={13} strokeWidth={2} />
      {rating}
    </span>
  );
}
