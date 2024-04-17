import React, { useState, useEffect } from "react";
import "./ins.css";

const Instructions = ({ active }) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [pos, setPos] = useState(false);

  useEffect(() => {
    setAnimationActive(active === "draw");
  }, [active]);

  useEffect(() => {
    if (active === "draw") {
      setPos(true);
    } else {
      const timer = setTimeout(() => {
        setPos(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className={`btm ${pos ? "animate" : ""}`}>
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
