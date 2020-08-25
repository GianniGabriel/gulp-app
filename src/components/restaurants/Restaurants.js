import React, { useContext, Fragment } from "react";
import RestaurantContext from "../../context/restaurants/restaurantContext";

const Restaurants = () => {
  const restaurantContext = useContext(RestaurantContext);
  const { restaurants, loading } = restaurantContext;

  return <Fragment></Fragment>;
};

export default Restaurants;
