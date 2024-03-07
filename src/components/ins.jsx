import React from "react";
import { useTrail, animated } from "react-spring";
import "./ins.css";

const Instructions = ({ active }) => {
  const items = [
    "Click: Confirm Continue",
    "Escape: Return Home",
    "Enter: Confirm Selection",
  ];

  const trail = useTrail(items.length, {
    opacity: active === "draw" ? 1 : 0,
    transform: active === "draw" ? "translateX(0)" : "translateX(230px)",
    config: { duration: 150 },
    from: { opacity: 0, transform: "translateX(230px)" },
  });

  return (
    <div className="btm">
      {trail.map((props, index) => (
        <animated.div key={index} style={props} className="btmBox">
          <h1 className="text">{items[index]}</h1>
        </animated.div>
      ))}
    </div>
  );
};

export default Instructions;
