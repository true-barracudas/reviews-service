import React, { useContext } from 'react';
import Review from './Review';
import ReviewContext from './ReviewContext';
import styles from '../../../public/styles.css';

function Reviews() {
  const { reviews } = useContext(ReviewContext);

  return (
    <div className={styles.reviewList}>
      {reviews ? reviews.map((review) => (
        <Review
          key={review.userName}
          stars={review.stars}
          date={review.reviewDate}
          summary={review.summary}
          fullReview={review.fullReview}
          user={review.userName}
          image={review.image}
          recommended={review.recommended}
          verified={review.verified}
          helpfulYes={review.helpfulYes}
          helpfulNo={review.helpfulNo}
        />
      )) : null}
    </div>
  );
}

export default Reviews;
