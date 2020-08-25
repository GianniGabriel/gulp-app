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
    <div
      id="bg-image"
      ref={showcase}
      style={{
        background:
          '#fff url("https://source.unsplash.com/1600x900/?breakfast,dinner") no-repeat fixed center/cover',
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "5rem",
          font: "'Alata', sans-serif",
          textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          position: "relative",
          top: "25vh",
        }}
      >
        Gulp
      </h1>
      <Search styleObj={searchStyle} />
    </div>
  );
};

export default Showcase;
