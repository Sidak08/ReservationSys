import Navbar from "./navbar";
import React, { useEffect, useRef, useState } from "react";
import "./draw.css";
import activeDot from "../assets/activeDit.svg";

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
  const [linesArray, setLinesArray] = useState([{ x: 0, y: 0 }]);

  const activeDotImage = new Image();
  activeDotImage.src = activeDot;
  const [lastClick, setLastClick] = useState({ x: 0, y: 0 });

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
      linesArray.push({
        x: mousePosition.x - offset.x,
        y: mousePosition.y - offset.y,
      });
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

    for (let i = 0; i < linesArray.length - 1; i++) {
      context.strokeStyle = "white";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(linesArray[i].x + offset.x, linesArray[i].y + offset.y);
      context.lineTo(
        linesArray[i + 1].x + offset.x,
        linesArray[i + 1].y + offset.y,
      );
      context.stroke();
    }
  }, [mousePosition, active]);

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
