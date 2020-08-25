import React, { Fragment } from "react";

import RestaurantState from "./context/restaurants/RestaurantState";

import Showcase from "./components/layout/Showcase";
import Restaurants from "./components/restaurants/Restaurants";

import "./App.css";

function App() {
  return (
    <RestaurantState>
      <Fragment>
        <Showcase />
        {/* Results */}
        <Restaurants />
      </Fragment>
    </RestaurantState>
  );
}

export default App;
