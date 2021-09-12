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
    // Scroll down after 50ms delay
    setTimeout(() => {
      window.scrollTo(0, 3000);
    }, 50);
  };
  return (
    <div id="search-bar" style={styleObj}>
      <form action="#results" onSubmit={onSubmit}>
        <div className="search-inputs">
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
        </div>
      </form>
    </div>
  );
};

export default Search;
