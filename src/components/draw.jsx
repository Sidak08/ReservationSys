import Navbar from "./navbar";
import React, { useEffect, useRef, useState } from "react";
import "./draw.css";
import inActiveDot from "../assets/inActiveDot.svg";
import activeDot from "../assets/activeDot.svg";

const Draw = () => {
  const [activeNav, setActiveNav] = useState("home");
  return (
    <div>
      <Navbar active={activeNav} setActive={setActiveNav} />
      <CanvasComponent active={activeNav} setActive={setActiveNav} />
    </div>
  );
};

const CanvasComponent = ({ active, setActive }) => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [linesArray, setLinesArray] = useState([[{ x: 0, y: 0 }]]);
  const [lastClick, setLastClick] = useState({ x: 0, y: 0 });

  const activeDotImage = new Image();
  activeDotImage.src = activeDot;

  const inActiveDotImage = new Image();
  inActiveDotImage.src = inActiveDot;

  const handleMouseMove = (e) => {
    if (panning) {
      const dx = e.clientX - mousePosition.x;
      console.log(dx, e.clientX, mousePosition.x);
      const dy = e.clientY - mousePosition.y;
      setOffset((prevOffset) => ({
        x: prevOffset.x + dx,
        y: prevOffset.y + dy,
      }));
    }
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const handleMouseDown = () => {
    if (active === "home" || active === "edit") setPanning(true);

    if (active === "draw") {
      setLastClick({
        x: mousePosition.x - offset.x,
        y: mousePosition.y - offset.y,
      });
      linesArray[linesArray.length - 1].push({
        x: mousePosition.x - offset.x,
        y: mousePosition.y - offset.y,
      });

      console.log(linesArray[linesArray.length - 1].length);
    }
  };
  const handleMouseUp = () => {
    setPanning(false);
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
      context.drawImage(
        activeDotImage,
        mousePosition.x - 7,
        mousePosition.y - 7,
        14,
        14,
      );

      context.strokeStyle = "#1681FF";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(lastClick.x + offset.x, lastClick.y + offset.y);
      context.lineTo(mousePosition.x, mousePosition.y);
      context.stroke();
    }

    for (let j = 0; j < linesArray.length; j++) {
      for (let i = 0; i < linesArray[j].length - 1; i++) {
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
      }
    }

    context.drawImage(
      inActiveDotImage,
      linesArray[linesArray.length - 1][
        linesArray[linesArray.length - 1].length - 1
      ].x +
        offset.x -
        7,
      linesArray[linesArray.length - 1][
        linesArray[linesArray.length - 1].length - 1
      ].y +
        offset.y -
        7,
      14,
      14,
    );
  }, [mousePosition, active, lastClick]);

  useEffect(() => {
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
      style={{
        cursor: active === "home" || active === "edit" ? "grabbing" : "auto",
      }}
    />
  );
};

export default Draw;
