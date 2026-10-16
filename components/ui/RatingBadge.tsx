import { Star } from "lucide-react";

import { formatRating } from "@/lib/format";

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export default function RatingBadge({ rating, className = "" }: RatingBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 font-semibold tabular-nums ${className}`}>
      <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
      <span aria-label={`Puntaje ${formatRating(rating)} de 10`}>{formatRating(rating)}</span>
    </span>
  );
}
