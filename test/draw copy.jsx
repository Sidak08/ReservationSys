import Navbar from "./navbar";
import React, { useEffect, useRef, useState } from "react";
import "./draw.css";
import inActiveDot from "../assets/inActiveDot.svg";
import activeDot from "../assets/activeDot.svg";

const Draw = () => {
  // const [activeNav, setActiveNav] = useState("home");
  // const [linesArray, setLinesArray] = useState([[{ x: false, y: false }]]);
  // const [lastClick, setLastClick] = useState({ x: false, y: false });

  const activeNavRef = useRef("home");
  const linesArrayRef = useRef([[{ x: false, y: false }]]);
  const lastClickRef = useRef({ x: false, y: false });

  return (
    <div>
      <Navbar
        activeNavRef={activeNavRef.current}
        linesArrayRef={linesArrayRef.current}
        lastClickRef={lastClickRef.current}
      />
      <CanvasComponent
        active={activeNavRef.current}
        linesArray={linesArrayRef}
        lastClick={lastClickRef.current}
      />
    </div>
  );
};

const CanvasComponent = ({ active, linesArray, lastClick }) => {
  const canvasRef = useRef(null);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const [panning, setPanning] = useState(false);
  // const [offset, setOffset] = useState({ x: 0, y: 0 });

  const positionRef = useRef({ x: 0, y: 0 });
  const panRef = useRef(false);
  const offSetRef = useRef({ x: 0, y: 0 });

  const activeDotImage = new Image();
  activeDotImage.src = activeDot;

  const inActiveDotImage = new Image();
  inActiveDotImage.src = inActiveDot;

  const handleMouseMove = (e) => {
    if (panRef.current) {
      const dx = e.clientX - positionRef.current.x;
      const dy = e.clientY - positionRef.current.y;

      offSetRef.current = {
        x: offSetRef.current.x + dx,
        y: offSetRef.current.y + dy,
      };
    }
    positionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseDown = () => {
    if (active === "home" || active === "edit") {
      panRef.current = true;
    }

    console.log(active);
    if (active === "draw") {
      lastClick.current = {
        x: positionRef.current.x - offSetRef.current.x,
        y: positionRef.current.y - offSetRef.current.y,
      };
      linesArray.current[linesArray.current.length - 1].push({
        x: positionRef.current.x - offSetRef.current.x,
        y: positionRef.current.y - offSetRef.current.y,
      });
    }
  };
  const handleMouseUp = () => {
    panRef.current = false;
  };

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#0D0D0D";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#FF0000";
      context.fillRect(
        500 + offSetRef.current.x,
        500 + offSetRef.current.y,
        70,
        70,
      );

      if (active === "draw") {
        context.drawImage(
          activeDotImage,
          positionRef.current.x - 7,
          positionRef.current.y - 7,
          14,
          14,
        );

        context.strokeStyle = "#1681FF";
        context.lineWidth = 1.5;
        if (lastClick.x !== false) {
          context.beginPath();
          context.moveTo(
            lastClick.x + offSetRef.current.x,
            lastClick.y + offSetRef.current.y,
          );
          context.lineTo(positionRef.x, positionRef.y);
          context.stroke();
        }
      }

      for (let j = 0; j < linesArray.current.length; j++) {
        for (let i = 1; i < linesArray.current[j].length - 1; i++) {
          context.strokeStyle = "white";
          context.lineWidth = 1.5;
          context.beginPath();
          context.moveTo(
            linesArray.current[j][i].x + offSetRef.current.x,
            linesArray.current[j][i].y + offSetRef.current.y,
          );
          context.lineTo(
            linesArray.current[j][i + 1].x + offSetRef.current.x,
            linesArray.current[j][i + 1].y + offSetRef.current.y,
          );
          context.stroke();

          context.drawImage(
            inActiveDotImage,
            linesArray.current[j][i].x + offSetRef.current.x - 7,
            linesArray.current[j][i].y + offSetRef.current.y - 7,
            14,
            14,
          );

          if (i + 2 === linesArray.current[j].length) {
            console.log(
              linesArray.current[j][i + 1].x,
              linesArray.current[j][i + 1].y,
            );
            context.drawImage(
              inActiveDotImage,
              linesArray.current[j][i + 1].x + offSetRef.current.x - 7,
              linesArray.current[j][i + 1].y + offSetRef.current.y - 7,
              14,
              14,
            );
          }
        }
      }
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

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
