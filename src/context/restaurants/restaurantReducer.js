import {
  GET_RESTAURANTS,
  GET_REVIEWS,
  SET_LOADING,
  NO_RESULTS,
  SEARCH_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        reviews: [],
        error: null,
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          ...action.payload,
        },
        loading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case NO_RESULTS:
      return {
        ...state,
        loading: false,
        restaurants: [],
        reviews: [],
        error: null,
      };
    case SEARCH_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};
