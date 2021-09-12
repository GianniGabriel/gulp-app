import React, { useRef, useState } from "react";
import Search from "./Search";

const Showcase = () => {
  const showcase = useRef(null);
  const [searchFixed, setSearchFixed] = useState(false);
  // const [styles, setStyles] = useState(null);
  window.onscroll = () => {
    const showcaseBtm =
      showcase.current.offsetTop + showcase.current.offsetHeight;
    setSearchFixed(window.pageYOffset > showcaseBtm - 75);
  };

  const searchStyle = !searchFixed
    ? {
        position: "sticky",
        top: "40vh",
      }
    : {
        position: "fixed",
        left: "25vw",
        top: "0vh",
      };

  return (
    <div id="bg-image" className="showcase-background" ref={showcase}>
      <h1 className="gulp-title">
        <i style={{ color: "#FFCB01" }} className="far fa-dizzy"></i> Gulp
      </h1>
      <Search styleObj={searchStyle} />
    </div>
  );
};

export default Showcase;
