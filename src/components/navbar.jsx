import "./navbar.css";
import { Draw, Edit, Home, Setting } from "./svg.jsx";
import React, { useState } from "react";

const Navbar = ({
  active,
  setActive,
  linesArray,
  setLinesArray,
  lastClick,
  setLastClick,
  color,
  setColor,
}) => {
  return (
    <div id="backGroundDiv">
      <div id="upperDiv">
        <button
          onClick={() => {
            setColor({
              home: { backgroundColor: "white", color: "#3B3939" },
              edit: { backgroundColor: "#3B3939", color: "white" },
              draw: { backgroundColor: "#3B3939", color: "white" },
              setting: { backgroundColor: "#3B3939", color: "white" },
            });
            setActive("home");
            setLastClick({ x: false, y: false });
            if (
              linesArray[linesArray.length - 1][
                linesArray[linesArray.length - 1].length - 1
              ].x != false
            ) {
              linesArray.push([{ x: false, y: false }]);
            }
          }}
        >
          <Home
            backgroundColor={color.home.backgroundColor}
            color={color.home.color}
          />
        </button>

        <button
          onClick={() => {
            setColor({
              home: { backgroundColor: "#3B3939", color: "white" },
              edit: { backgroundColor: "white", color: "#3B3939" },
              draw: { backgroundColor: "#3B3939", color: "white" },
              setting: { backgroundColor: "#3B3939", color: "white" },
            });
            setActive("edit");
            setLastClick({ x: false, y: false });
            if (
              linesArray[linesArray.length - 1][
                linesArray[linesArray.length - 1].length - 1
              ].x != false
            ) {
              linesArray.push([{ x: false, y: false }]);
            }
          }}
        >
          <Edit
            backgroundColor={color.edit.backgroundColor}
            color={color.edit.color}
          />
        </button>

        <button
          onClick={() => {
            setActive("draw");
            setColor({
              home: { backgroundColor: "#3B3939", color: "white" },
              edit: { backgroundColor: "#3B3939", color: "white" },
              draw: { backgroundColor: "white", color: "#3B3939" },
              setting: { backgroundColor: "#3B3939", color: "white" },
            });
          }}
        >
          <Draw
            backgroundColor={color.draw.backgroundColor}
            color={color.draw.color}
          />
        </button>
      </div>
      <div id="lowerDiv">
        <button
          onClick={() => {
            setColor({
              home: { backgroundColor: "#3B3939", color: "white" },
              edit: { backgroundColor: "#3B3939", color: "white" },
              draw: { backgroundColor: "#3B3939", color: "white" },
              setting: { backgroundColor: "white", color: "#3B3939" },
            });
            setActive("setting");
            setLastClick({ x: false, y: false });
            if (
              linesArray[linesArray.length - 1][
                linesArray[linesArray.length - 1].length - 1
              ].x != false
            ) {
              linesArray.push([{ x: false, y: false }]);
            }
          }}
        >
          <Setting
            backgroundColor={color.setting.backgroundColor}
            color={color.setting.color}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
