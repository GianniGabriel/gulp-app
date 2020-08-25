import React, { useState, useContext } from "react";
import RestaurantContext from "../../context/restaurants/restaurantContext";

const Search = ({ styleObj }) => {
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");

  const restaurantContext = useContext(RestaurantContext);
  const { getRestaurants } = restaurantContext;

  const onSubmit = (e) => {
    e.preventDefault();
    if (location === "") {
      getRestaurants(text, "NYC");
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
          className="form-label"
          placeholder="delis, burgers, chinese..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          name="location"
          className="location-label"
          placeholder="address, city, or zipcode"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input id="search-btn" type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Search;
