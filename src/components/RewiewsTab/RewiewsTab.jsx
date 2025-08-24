import css from "./RewiewsTab.module.css";
import starFilledIcon from "../../assets/icons/ratingAc.svg";
import starEmptyIcon from "../../assets/icons/rating.svg";

const ReviewsTab = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className={css.noReviews}>
        <p>No reviews available for this camper yet.</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= rating;
      stars.push(
        <span key={i} className={css.star}>
          <img src={isFilled ? starFilledIcon : starEmptyIcon} alt="star" />
        </span>
      );
    }

    return stars;
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={css.reviewsTab}>
      <div className={css.reviewsList}>
        {reviews.map((review, index) => (
          <div key={index} className={css.reviewItem}>
            <div className={css.reviewHeader}>
              <div className={css.reviewer}>
                <div className={css.avatar}>
                  {getInitials(review.reviewer_name)}
                </div>
                <div className={css.reviewerInfo}>
                  <h4 className={css.reviewerName}>{review.reviewer_name}</h4>
                  <div className={css.rating}>
                    {renderStars(review.reviewer_rating)}
                  </div>
                </div>
              </div>
            </div>

            <div className={css.reviewContent}>
              <p className={css.comment}>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
