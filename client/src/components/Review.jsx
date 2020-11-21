import React, { useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReviewContext from './ReviewContext';
import styles from '../../../public/styles.css';
import Stars from './Stars';

function Review(props) {
  const { currentShoe } = useContext(ReviewContext);
  const [helpfulYes, setHelpfulYes] = useState(props.helpfulYes);
  const [helpfulNo, setHelpfulNo] = useState(props.helpfulNo);
  const reviewDate = new Date(props.date);
  const day = reviewDate.getDate();
  const year = reviewDate.getFullYear();
  const options = { month: 'long' };
  const month = new Intl.DateTimeFormat('en-US', options).format(reviewDate);

  const addHelpful = (username) => {
    axios
      .post(`api/shoes/${currentShoe}/${username}/helpful`)
      .then(() => {
        setHelpfulYes(helpfulYes + 1);
      })
      .catch((err) => console.log(err));
  };

  const addNotHelpful = (username) => {
    axios
      .post(`api/shoes/${currentShoe}/${username}/nothelpful`)
      .then(() => {
        setHelpfulNo(helpfulNo + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.review}>
      <div className={styles.stars}>
        <Stars fill={props.stars} />
        <p className={styles.date}>{`${month} ${day}, ${year}`}</p>
      </div>
      <h5 className={styles.summary}>{props.summary}</h5>
      <p className={styles.reviewText}>{props.fullReview}</p>
      {props.recommended === 1 &&
          (
            <div>
              <p className={styles.recommended}>
                <span>
                  <svg id={styles.checkmark} viewBox="0 0 19 19">
                    <title>checkmark</title>
                    <path fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" d="M2.5 10.5l4 4 10-10" />
                  </svg>
                </span>
                I recommend this product
              </p>
            </div>
          )}
      {props.image && <img src={props.image}/>}
      <div className={styles.verifiedUser}>
        <p className={styles.user}>{props.user}</p>
        {props.verified === 1 && <span className={styles.verified}>- Verified Purchaser</span>}
      </div>
      <div className={styles.helpful}>
        <div>Was this review helpful?</div>
        <div className={styles.voteAlign}>
          <p className={styles.vote} onClick={() => addHelpful(props.user)}>Yes</p>
          <span className={styles.voteCount}>{`(${helpfulYes})`}</span>
        </div>
        <div className={styles.voteAlign}>
          <p className={styles.vote} onClick={() => addNotHelpful(props.user)}>No</p>
          <span className={styles.voteCount}>{`(${helpfulNo})`}</span>
        </div>
      </div>
    </div>
  );
}

export default Review;

Review.propTypes = {
  summary: PropTypes.string,
}
