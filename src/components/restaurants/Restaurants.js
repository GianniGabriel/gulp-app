import React, { useContext, useEffect } from "react";
import RestaurantContext from "../../context/restaurants/restaurantContext";
import RestaurantItem from "./RestaurantItem";
import ReviewItem from "./ReviewItem";
import Spinner from "../layout/Spinner";

const Restaurants = () => {
  const restaurantContext = useContext(RestaurantContext);
  const { restaurants, reviews, loading } = restaurantContext;
  let counter = 1;
  useEffect(() => {
    //eslint-disable-next-line
  }, []);
  if (loading) {
    return <Spinner />;
  } else if (restaurants !== null && restaurants.length === 0) {
    return (
      <div id="results" className="py-3">
        <h2>Wow... No bad restaurants found!</h2>
      </div>
    );
  }
  return (
    <div id="results">
      {restaurants !== null &&
        restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <RestaurantItem count={counter++} restaurant={restaurant} />
            {reviews[restaurant.id] && reviews[restaurant.id].length !== 0 && (
              <hr className="reviews-seperator" />
            )}
            {reviews[restaurant.id] &&
              reviews[restaurant.id].map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
          </div>
        ))}
    </div>
  );
};

export default Restaurants;
