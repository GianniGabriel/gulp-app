import React, { useReducer } from "react";
import axios from "axios";
import RestaurantContext from "./restaurantContext";
import restaurantReducer from "./restaurantReducer";
import {
  GET_RESTAURANTS,
  GET_REVIEWS,
  SET_LOADING,
  NO_RESULTS,
  SEARCH_ERROR,
} from "../types";

const RestaurantState = (props) => {
  const initialState = {
    restaurants: null,
    reviews: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  const cors_api_url = "https://cors-anywhere.herokuapp.com/";

  // Get Restaurants from Yelp API
  const getRestaurants = async (text, location) => {
    // Number of restaurants to search for
    const numResults = 20;
    const config = {
      headers: {
        Authorization:
          "Bearer tK3SafE_7qL0Cq8k_f022OGIXv5eBK_P7Vrl4jNDv9dgRdtdC7LuOxxakqmsir5X43Gc9MwGKKklBKZvx4oOu_Nr6vfOi1WeYlu51f5P9f_Kta9IESnZo8z31_w2X3Yx",
      },
    };
    try {
      setLoading();

      // Find # of restaurants to offset search by in order to find the worst restaurants
      const limit_res = await axios.get(
        `${cors_api_url}https://api.yelp.com/v3/businesses/search?sort_by=rating&limit=1&term=${text}&categories=${text}&location=${location}`,
        config
      );

      // Yelp limits search results to 1000 so check to make sure we don't offset over this limit
      let offset = 0;
      let limit = numResults;
      if (limit_res.data.total > 1000) {
        offset = 1000 - numResults;
      } else if (limit_res.data.total < numResults) {
        offset = 0;
        limit = limit_res.data.total;
      } else {
        offset = limit_res.data.total - numResults;
      }

      // Find list of restaurants by offsetting search by limit #
      const list_res = await axios.get(
        `${cors_api_url}https://api.yelp.com/v3/businesses/search?sort_by=rating&offset=${offset}&limit=${limit}&categories=${text}&term=${text}&location=${location}`,
        config
      );
      const restaurantList = list_res.data.businesses.filter(
        // Filter out restaurant list to only restaurants under 3 stars
        (restaurant) => restaurant.rating <= 3
      );
      restaurantList.reverse();
      dispatch({ type: GET_RESTAURANTS, payload: restaurantList });
      if (restaurantList.length > 0) {
        restaurantList.forEach((restaurant) => {
          // setTimeout to prevent "TOO MANY REQUESTS" error
          setTimeout(() => {
            getReviews(restaurant.id);
          }, 500);
        });
      } else {
        console.log("No results");
        dispatch({ type: NO_RESULTS });
      }
    } catch (err) {
      dispatch({ type: SEARCH_ERROR, payload: err.response });
    }
  };

  // Get Reviews
  const getReviews = async (id) => {
    const config = {
      headers: {
        Authorization:
          "Bearer tK3SafE_7qL0Cq8k_f022OGIXv5eBK_P7Vrl4jNDv9dgRdtdC7LuOxxakqmsir5X43Gc9MwGKKklBKZvx4oOu_Nr6vfOi1WeYlu51f5P9f_Kta9IESnZo8z31_w2X3Yx",
      },
    };
    try {
      setLoading();
      const reviews_res = await axios.get(
        `${cors_api_url}https://api.yelp.com/v3/businesses/${id}/reviews`,
        config
      );
      const restReview = {
        // Only get reviews that are less than 3 stars
        [id]: reviews_res.data.reviews.filter((review) => review.rating < 3),
      };
      dispatch({ type: GET_REVIEWS, payload: restReview });
    } catch (err) {
      dispatch({ type: SEARCH_ERROR, payload: err.response });
    }
  };

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants: state.restaurants,
        reviews: state.reviews,
        error: state.error,
        loading: state.loading,
        getRestaurants,
        setLoading,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantState;
