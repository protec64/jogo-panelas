import { Star, Check } from "lucide-react";
import { Review } from "@/data/products";

interface ProductReviewsProps {
  reviews: Review[];
  rating: number;
}

const ProductReviews = ({ reviews, rating }: ProductReviewsProps) => {
  const totalReviews = reviews.length;
  
  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / totalReviews) * 100,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-card-foreground">
        Avaliações dos Clientes ({totalReviews})
      </h2>

      {/* Rating Summary */}
      <div className="bg-muted/30 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center sm:border-r sm:border-border/50 sm:pr-6">
            <span className="text-4xl font-bold text-card-foreground">{rating.toFixed(1)}</span>
            <div className="flex items-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-blue text-blue' : 'fill-muted text-muted'}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm mt-1">
              {totalReviews} avaliações
            </span>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {ratingCounts.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground w-3">{star}</span>
                <Star className="w-3 h-3 fill-blue text-blue" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-6">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-border/50 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-card-foreground">{review.name}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-blue bg-blue/10 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      Compra verificada
                    </span>
                  )}
                </div>
                <span className="text-muted-foreground text-sm">{review.date}</span>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-blue text-blue' : 'fill-muted text-muted'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
