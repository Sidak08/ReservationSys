import "./navbar.css";
import { Draw, Edit, Home, Setting } from "./svg.jsx";
import React, { useState } from "react";

const Navbar = ({ active, setActive }) => {
  const [color, setColor] = useState({
    home: { backgroundColor: "white", color: "#3B3939" },
    edit: { backgroundColor: "#3B3939", color: "white" },
    draw: { backgroundColor: "#3B3939", color: "white" },
    setting: { backgroundColor: "#3B3939", color: "white" },
  });
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
          }}
        >
          <Edit
            backgroundColor={color.edit.backgroundColor}
            color={color.edit.color}
          />
        </button>

        <button
          onClick={() => {
            setColor({
              home: { backgroundColor: "#3B3939", color: "white" },
              edit: { backgroundColor: "#3B3939", color: "white" },
              draw: { backgroundColor: "white", color: "#3B3939" },
              setting: { backgroundColor: "#3B3939", color: "white" },
            });
            setActive("draw");
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
