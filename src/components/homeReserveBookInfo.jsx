import "./homeReserveBookInfo.css";
import { useState, useEffect } from "react";
import { CloseSvg } from "./svg.jsx";
const BookInfo = ({
  info,
  renderBookInfo,
  activeNav,
  setBorderRed,
  borderRed,
  setRenderBookInfo,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (renderBookInfo && activeNav === "home") {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [renderBookInfo, activeNav]);

  useEffect(() => {
    if (borderRed === true) {
      const timer = setTimeout(() => {
        setBorderRed(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [borderRed]);

  return (
    <div
      className={`homeReserveBookInfo ${animate ? "animate" : ""} ${borderRed ? "redBorder" : ""}`}
    >
      <button
        onClick={() => setRenderBookInfo(false)}
        className="BookInfoClose"
      >
        <CloseSvg />
      </button>
    </div>
  );
};

export default BookInfo;
