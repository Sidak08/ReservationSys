import Navbar from "./navbar";
import React, { useEffect, useRef, useState } from "react";
import "./draw.css";
import inActiveDot from "../assets/inActiveDot.svg";
import activeDot from "../assets/activeDot.svg";

const Draw = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [linesArray, setLinesArray] = useState([[{ x: false, y: false }]]);
  const [lastClick, setLastClick] = useState({ x: false, y: false });
  const [color, setColor] = useState({
    home: { backgroundColor: "white", color: "#3B3939" },
    edit: { backgroundColor: "#3B3939", color: "white" },
    draw: { backgroundColor: "#3B3939", color: "white" },
    setting: { backgroundColor: "#3B3939", color: "white" },
  });

  const [keyPress, setKeyPress] = useState({ value: false });
  // console.log(keyPress);
  return (
    <div>
      <Navbar
        active={activeNav}
        setActive={setActiveNav}
        linesArray={linesArray}
        setLinesArray={setLinesArray}
        lastClick={lastClick}
        setLastClick={setLastClick}
        color={color}
        setColor={setColor}
      />
      <CanvasComponent
        active={activeNav}
        setActive={setActiveNav}
        linesArray={linesArray}
        setLinesArray={setLinesArray}
        lastClick={lastClick}
        setLastClick={setLastClick}
        keyPress={keyPress}
        setKeyPress={setKeyPress}
        color={color}
        setColor={setColor}
      />
    </div>
  );
};

const CanvasComponent = ({
  active,
  setActive,
  linesArray,
  setLinesArray,
  lastClick,
  setLastClick,
  setKeyPress,
  keyPress,
  setColor,
  color,
}) => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const activeDotImage = new Image();
  activeDotImage.src = activeDot;

  const inActiveDotImage = new Image();
  inActiveDotImage.src = inActiveDot;

  const handleMouseMove = (e) => {
    if (panning) {
      const dx = e.clientX - mousePosition.x;
      const dy = e.clientY - mousePosition.y;
      setOffset((prevOffset) => ({
        x: prevOffset.x + dx,
        y: prevOffset.y + dy,
      }));
    }
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const handleMouseDown = () => {
    if (active === "home" || active === "edit") {
      setPanning(true);
      setLastClick({ x: false, y: false });
      linesArray.push([{ x: false, y: false }]);
    }

    if (active === "draw") {
      setLastClick({
        x: mousePosition.x - offset.x,
        y: mousePosition.y - offset.y,
      });
      linesArray[linesArray.length - 1].push({
        x: mousePosition.x - offset.x,
        y: mousePosition.y - offset.y,
      });
    }
  };
  const handleMouseUp = () => {
    setPanning(false);
  };
  const keyPressed = (e) => {
    setKeyPress({ value: e.key });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#0D0D0D";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FF0000";
    context.fillRect(500 + offset.x, 500 + offset.y, 70, 70);

    if (active === "draw") {
      if (keyPress.value === "Escape") {
        setActive("home");
        setLastClick({ x: false, y: false });
        if (linesArray[linesArray.length - 1].x !== false) {
          linesArray.push([{ x: false, y: false }]);
        }
        setColor({
          home: { backgroundColor: "white", color: "#3B3939" },
          edit: { backgroundColor: "#3B3939", color: "white" },
          draw: { backgroundColor: "#3B3939", color: "white" },
          setting: { backgroundColor: "#3B3939", color: "white" },
        });
        setKeyPress({ value: false });
      }

      if (keyPress.value === "Enter") {
        setColor({
          home: { backgroundColor: "white", color: "#3B3939" },
          edit: { backgroundColor: "#3B3939", color: "white" },
          draw: { backgroundColor: "#3B3939", color: "white" },
          setting: { backgroundColor: "#3B3939", color: "white" },
        });
        handleMouseDown();
        handleMouseUp();
        setKeyPress({ value: false });
        setLastClick({ x: false, y: false });
        setActive("home");
        if (linesArray[linesArray.length - 1].x !== false) {
          linesArray.push([{ x: false, y: false }]);
        }
      }

      context.strokeStyle = "#1681FF";
      context.lineWidth = 1.5;
      if (lastClick.x !== false) {
        context.beginPath();
        context.moveTo(lastClick.x + offset.x, lastClick.y + offset.y);
        if (
          lastClick.x + offset.x - 10 <= mousePosition.x &&
          lastClick.x + offset.x + 10 >= mousePosition.x
        ) {
          context.strokeStyle = "red";
          mousePosition.x = lastClick.x + offset.x;
        }

        if (
          lastClick.y + offset.y - 10 <= mousePosition.y &&
          lastClick.y + offset.y + 10 >= mousePosition.y
        ) {
          context.strokeStyle = "red";
          mousePosition.y = lastClick.y + offset.y;
        }

        context.lineTo(mousePosition.x, mousePosition.y);
        context.stroke();
      }
      //draw the active line
      context.drawImage(
        activeDotImage,
        mousePosition.x - 7,
        mousePosition.y - 7,
        14,
        14,
      );
    }

    for (let j = 0; j < linesArray.length; j++) {
      for (let i = 1; i < linesArray[j].length - 1; i++) {
        context.strokeStyle = "white";
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(
          linesArray[j][i].x + offset.x,
          linesArray[j][i].y + offset.y,
        );
        context.lineTo(
          linesArray[j][i + 1].x + offset.x,
          linesArray[j][i + 1].y + offset.y,
        );
        context.stroke();

        context.drawImage(
          inActiveDotImage,
          linesArray[j][i].x + offset.x - 7,
          linesArray[j][i].y + offset.y - 7,
          14,
          14,
        );

        if (linesArray[j].length === i + 2) {
          context.drawImage(
            inActiveDotImage,
            linesArray[j][i + 1].x + offset.x - 7,
            linesArray[j][i + 1].y + offset.y - 7,
            14,
            14,
          );
        }
      }
    }
  }, [mousePosition, active, lastClick, keyPress]);

  // resize canvas
  useEffect(() => {
    window.addEventListener("keydown", keyPressed);
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={keyPressed}
      style={{
        cursor: active === "home" || active === "edit" ? "grabbing" : "auto",
      }}
    />
  );
};

export default Draw;
