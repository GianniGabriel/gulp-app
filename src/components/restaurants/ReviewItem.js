import React from "react";
import PropTypes from "prop-types";
import default_image from "./user_default.png";
import zero_stars from "../yelp_stars/large/large_0@2x.png";
import one_stars from "../yelp_stars/large/large_1@2x.png";
import one_half_stars from "../yelp_stars/large/large_1_half@2x.png";
import two_stars from "../yelp_stars/large/large_2@2x.png";
import two_half_stars from "../yelp_stars/large/large_2_half@2x.png";
import three_stars from "../yelp_stars/large/large_3@2x.png";

const ReviewItem = ({ review }) => {
  const { user, rating, text } = review;
  return (
    <div className="review-item">
      <div className="review-topbar">
        <img
          className="user-image"
          src={user.image_url || default_image}
          alt="profile"
        />
        <p>{user.name}</p>
        <img
          className="review-rating"
          src={(() => {
            switch (rating) {
              case 3:
                return three_stars;
              case 2.5:
                return two_half_stars;
              case 2:
                return two_stars;
              case 1.5:
                return one_half_stars;
              case 1:
                return one_stars;
              default:
                return zero_stars;
            }
          })()}
          alt={`${rating} stars`}
        />
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;
