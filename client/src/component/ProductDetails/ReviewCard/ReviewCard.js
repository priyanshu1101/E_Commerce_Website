import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import moment from 'moment';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const [userReview, setUserReview] = useState(review);
  const options = {
    edit: false,
    color2: '#ffa41c',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    value: review.rating
  };
  useEffect(() => {
    setUserReview(review);
  }, [review])
  return (
    <div className="review-card">
      <div className="card-header">
        <img className="profile-image" src={userReview.user.avatar && userReview.user.avatar.url} alt="User" />
        <div className="review-info">
          <p className="review-name">{userReview.name}</p>
          <ReactStars {...options} />
        </div>
      </div>
      <div className="card-body">
        <p className="review-comment">{userReview.comment}</p>
      </div>
      <div className="card-footer">
        <div className="review-date">
          <i className="far fa-clock"></i>
          {moment(review.reviewAt).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
