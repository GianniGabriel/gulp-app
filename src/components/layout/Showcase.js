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
          background: "rgba(51,51,51,0.5)",
          width: "20%",
          margin: "auto",
          borderRadius: "10px",
          textShadow: "-1px 0 #333, 0 1px #333, 1px 0 #333, 0 -1px #333",
          position: "relative",
          top: "25vh",
        }}
      >
        <i style={{ color: "#FFCB01" }} className="far fa-dizzy"></i> Gulp
      </h1>
      <Search styleObj={searchStyle} />
    </div>
  );
};

export default Showcase;
