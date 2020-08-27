import React, { useState, useContext } from "react";
import RestaurantContext from "../../context/restaurants/restaurantContext";

const Search = ({ styleObj }) => {
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");

  const restaurantContext = useContext(RestaurantContext);
  const { getRestaurants, loading } = restaurantContext;

  const onSubmit = (e) => {
    e.preventDefault();
    if (location === "") {
      setLocation("New York, NY");
      getRestaurants(text, "New York, NY");
    } else {
      getRestaurants(text, location);
    }
  };
  return (
    <div id="search-bar" style={styleObj}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          className="text-input"
          placeholder="delis, burgers, chinese..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          name="location"
          className="location-input"
          placeholder="address, city, or zipcode"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {!loading ? (
          <button id="search-btn" type="submit">
            <i className="fas fa-search"></i>
          </button>
        ) : (
          <button id="search-btn" type="submit" disabled>
            {"Loading..."}
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
