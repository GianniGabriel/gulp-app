import React, { useContext, useEffect, Fragment } from "react";
import RestaurantContext from "../../context/restaurants/restaurantContext";
import RestaurantItem from "./RestaurantItem";
import Spinner from "../layout/Spinner";

const Restaurants = () => {
  const restaurantContext = useContext(RestaurantContext);
  const { restaurants, loading } = restaurantContext;
  let counter = 1;
  useEffect(() => {
    //eslint-disable-next-line
  }, []);
  if (loading) {
    return <Spinner />;
  } else if (restaurants !== null && restaurants.length === 0) {
    return (
      <div className="py-3">
        <h2>Wow... No bad restaurants found!</h2>
      </div>
    );
  }
  return (
    <Fragment>
      {restaurants !== null &&
        restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            count={counter++}
            restaurant={restaurant}
          />
        ))}
    </Fragment>
  );
};

export default Restaurants;
