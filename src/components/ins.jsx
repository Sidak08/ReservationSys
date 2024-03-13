import React, { useState, useEffect } from "react";
import "./ins.css";

const Instructions = ({ active }) => {
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    setAnimationActive(active === "draw");
  }, [active]);

  return (
    <div className="btm">
      <div className={`btmBox ${animationActive ? "animate" : ""}`}>
        <h1 className="text">Click: Confirm Continue</h1>
      </div>

      <div className={`btmBox ${animationActive ? "animate" : ""}`}>
        <h1 className="text">Escape: Return Home</h1>
      </div>

      <div className={`btmBox ${animationActive ? "animate" : ""}`}>
        <h1 className="text">Enter: Confirm Selection</h1>
      </div>
    </div>
  );
};

export default Instructions;
