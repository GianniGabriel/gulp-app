import React, { Fragment } from "react";
import PropTypes from "prop-types";
import no_image from "./no_image.png";
import zero_stars from "../yelp_stars/regular/regular_0@2x.png";
import one_stars from "../yelp_stars/regular/regular_1@2x.png";
import one_half_stars from "../yelp_stars/regular/regular_1_half@2x.png";
import two_stars from "../yelp_stars/regular/regular_2@2x.png";
import two_half_stars from "../yelp_stars/regular/regular_2_half@2x.png";
import three_stars from "../yelp_stars/regular/regular_3@2x.png";

const RestaurantItem = ({ restaurant, count }) => {
  return (
    <Fragment>
      <div className="restaurant-card">
        <img
          className="restaurant-image"
          src={restaurant.image_url === "" ? no_image : restaurant.image_url}
          alt={restaurant.alias}
        />
        <div className="info-section">
          <h3 className="restaurant-title">{`${count}. ${restaurant.name}`}</h3>
          <p className="categories">
            {restaurant.categories.map((category) => category.title).join(", ")}
          </p>
          <div className="rating">
            <img
              src={(() => {
                switch (restaurant.rating) {
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
              alt={`${restaurant.rating} stars`}
            />
            <p className="mx-1">{restaurant.review_count} reviews</p>
          </div>

          <div className="address">
            <p>{restaurant.location.display_address.join(" ")}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

RestaurantItem.propTypes = {
  restaurant: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
};

export default RestaurantItem;
