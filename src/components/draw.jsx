import Navbar from "./navbar";
import React, { useEffect, useRef, useState } from "react";
import "./draw.css";

const Draw = () => {
  return (
    <div>
      <Navbar />
      <CanvasComponent />
    </div>
  );
};

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
    setPanning(true);
  };
  const handleMouseUp = () => {
    setPanning(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    console.log(canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#0D0D0D";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FF0000";
    context.fillRect(500 + offset.x, 500 + offset.y, 70, 70);
  }, [mousePosition]);

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
      style={{ cursor: panning ? "grabbing" : "grab" }}
    />
  );
};

export default Draw;
