import "./homeReserve.css";
import { useEffect, useState } from "react";

const HomeReserve = ({ activeElement, activeNav, elementsArray }) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [lastActiveElement, setLastActiveElement] = useState(false);
  const [lastActiveElementInfo, setLastActiveElementInfo] = useState({
    title: "",
  });

  useEffect(() => {
    setAnimationActive(
      activeElement !== false &&
        activeNav === "home" &&
        elementsArray.length > 0,
    );
  }, [activeElement, activeNav]);

  if (
    lastActiveElement !== false &&
    activeNav === "home" &&
    activeElement !== false
  ) {
    return (
      <div className={`homeReserveDiv ${animationActive ? "animate" : ""}`}>
        <h1>{elementsArray[lastActiveElement].title}</h1>
      </div>
    );
  } else {
    return (
      <div className={`homeReserveDiv ${animationActive ? "animate" : ""}`}>
        <h1>{lastActiveElementInfo.title}</h1>
      </div>
    );
  }
};
export default HomeReserve;
