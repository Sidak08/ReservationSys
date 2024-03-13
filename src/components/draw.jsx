import Navbar from "./navbar";
import React, { useEffect, useRef, useState } from "react";
import "./draw.css";
import inActiveDot from "../assets/inActiveDot.svg";
import activeDot from "../assets/activeDot.svg";
import roundTable from "../assets/roundTable.svg";
import squareTable from "../assets/squareTable.svg";
import rectangleTable from "../assets/rectangleTable.svg";
import chair from "../assets/chair.svg";
import highChair from "../assets/highChair.svg";
import sofa from "../assets/sofa.svg";
import Instructions from "./ins";
import BottomBar from "./bottomBar";
import EditLayout from "./editLayot";

const Draw = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [linesArray, setLinesArray] = useState([[{ x: false, y: false }]]);
  const [lastClick, setLastClick] = useState({ x: false, y: false });
  const [selectedElement, setSelectedElement] = useState(false);
  const [elementsArray, setElementsArray] = useState([]);
  const [color, setColor] = useState({
    home: { backgroundColor: "white", color: "#3B3939" },
    edit: { backgroundColor: "#3B3939", color: "white" },
    draw: { backgroundColor: "#3B3939", color: "white" },
    setting: { backgroundColor: "#3B3939", color: "white" },
  });
  const [activeElement, setActiveElement] = useState(false);
  const [keyPress, setKeyPress] = useState({ value: false });

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
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        elementsArray={elementsArray}
        setElementsArray={setElementsArray}
        activeElement={activeElement}
        setActiveElement={setActiveElement}
      />
      <Instructions active={activeNav} />
      <BottomBar />
      <EditLayout
        active={activeNav}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
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
  setSelectedElement,
  selectedElement,
  elementsArray,
  setElementsArray,
  activeElement,
  setActiveElement,
}) => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [initialization, setInitialization] = useState(false);
  const activeDotImage = new Image();
  activeDotImage.src = activeDot;
  const inActiveDotImage = new Image();
  inActiveDotImage.src = inActiveDot;
  const HoverEditImage = new Image();
  const hoverImage = { height: 0, width: 0 };
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("grab");
  const [resizingObject, setResizingObject] = useState(false);
  const [movingObject, setMovingObject] = useState(false);
  const [movingLinesArrayPoint, setMovingLinesArrayPoint] = useState(false);

  const handleMouseMove = (e) => {
    if (panning) {
      const dx = e.clientX - mousePosition.x;
      const dy = e.clientY - mousePosition.y;
      setOffset((prevOffset) => ({
        x: prevOffset.x + dx / 1.5,
        y: prevOffset.y + dy / 1.5,
      }));
    }
    if (
      panning == false &&
      active == "edit" &&
      isMouseDown &&
      activeElement !== false &&
      cursorStyle === "grab" &&
      movingObject
    ) {
      // to grab and move elements fix the mouse posting when it is not in the center
      elementsArray[activeElement].x =
        e.clientX - offset.x - elementsArray[activeElement].width / 2;
      elementsArray[activeElement].y =
        e.clientY - offset.y - elementsArray[activeElement].height / 2;
    }
    // NEVER TOUCH THIS RESIZING CODE PLZ also fix the negative heigh | width problem
    if (resizingObject !== false && isMouseDown && active == "edit") {
      if (elementsArray[resizingObject].reSize === "n") {
        const ogBottom =
          elementsArray[resizingObject].y +
          elementsArray[resizingObject].height;
        const newHeight = ogBottom - e.clientY + offset.y;
        elementsArray[resizingObject].y = e.clientY - offset.y;
        elementsArray[resizingObject].height = newHeight;
      } else if (elementsArray[resizingObject].reSize === "ne") {
        const ogBottom =
          elementsArray[resizingObject].y +
          elementsArray[resizingObject].height;
        const newHeight = ogBottom - e.clientY + offset.y;
        elementsArray[resizingObject].y = e.clientY - offset.y;
        elementsArray[resizingObject].height = newHeight;
        elementsArray[resizingObject].width =
          e.clientX - elementsArray[resizingObject].x - offset.x;
      } else if (elementsArray[resizingObject].reSize === "e") {
        elementsArray[resizingObject].width =
          e.clientX - elementsArray[resizingObject].x - offset.x;
      } else if (elementsArray[resizingObject].reSize === "se") {
        elementsArray[resizingObject].width =
          e.clientX - elementsArray[resizingObject].x - offset.x;
        elementsArray[resizingObject].height =
          e.clientY - elementsArray[resizingObject].y - offset.y;
      } else if (elementsArray[resizingObject].reSize === "s") {
        elementsArray[resizingObject].height =
          e.clientY - elementsArray[resizingObject].y - offset.y;
      } else if (elementsArray[resizingObject].reSize === "sw") {
        elementsArray[resizingObject].height =
          e.clientY - elementsArray[resizingObject].y - offset.y;
        const ogRight =
          elementsArray[resizingObject].x + elementsArray[resizingObject].width;
        const newWidth = ogRight - e.clientX + offset.x;
        elementsArray[resizingObject].x = e.clientX - offset.x;
        elementsArray[resizingObject].width = newWidth;
      } else if (elementsArray[resizingObject].reSize === "w") {
        const ogRight =
          elementsArray[resizingObject].x + elementsArray[resizingObject].width;
        const newWidth = ogRight - e.clientX + offset.x;
        elementsArray[resizingObject].x = e.clientX - offset.x;
        elementsArray[resizingObject].width = newWidth;
      } else if (elementsArray[resizingObject].reSize === "nw") {
        const ogBottom =
          elementsArray[resizingObject].y +
          elementsArray[resizingObject].height;
        const newHeight = ogBottom - e.clientY + offset.y;
        elementsArray[resizingObject].y = e.clientY - offset.y;
        elementsArray[resizingObject].height = newHeight;
        const ogRight =
          elementsArray[resizingObject].x + elementsArray[resizingObject].width;
        const newWidth = ogRight - e.clientX + offset.x;
        elementsArray[resizingObject].x = e.clientX - offset.x;
        elementsArray[resizingObject].width = newWidth;
      }

      // elementsArray[resizingObject].width =
      //   e.clientX - elementsArray[resizingObject].x - offset.x;
      // elementsArray[resizingObject].height =
      //   e.clientY - elementsArray[resizingObject].y - offset.y;
    }
    if (movingLinesArrayPoint !== false) {
      //moving an dot
      linesArray[movingLinesArrayPoint.i][movingLinesArrayPoint.j].x =
        e.clientX - offset.x;
      linesArray[movingLinesArrayPoint.i][movingLinesArrayPoint.j].y =
        e.clientY - offset.y;
    }
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const onTouchMove = (e) => {
    setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });

    if (panning) {
      const dx = e.touches[0].clientX - mousePosition.x;
      const dy = e.touches[0].clientY - mousePosition.y;
      setOffset((prevOffset) => ({
        x: prevOffset.x + dx,
        y: prevOffset.y + dy,
      }));
    }
    if (panning == false && active == "edit" && isMouseDown) {
      // to move the element
      elementsArray[activeElement].x =
        e.clientX - offset.x - elementsArray[activeElement].width / 2;
      elementsArray[activeElement].y =
        e.clientY - offset.y - elementsArray[activeElement].width / 2;
    }
  };
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    setMousePosition({ x: clientX, y: clientY });
    if (active === "home" || active === "edit") {
      setPanning(true);
      setLastClick({ x: false, y: false });
    }

    if (active === "draw") {
      setLastClick({
        x: clientX - offset.x,
        y: clientY - offset.y,
      });
      linesArray[linesArray.length - 1].push({
        x: clientX - offset.x,
        y: clientY - offset.y,
      });
    }

    if (active === "edit") {
      // for adding the elements
      if (selectedElement !== false) {
        elementsArray.push({
          image: HoverEditImage,
          x: clientX - offset.x - hoverImage.width / 2,
          y: clientY - offset.y - hoverImage.height / 2,
          width: hoverImage.width,
          height: hoverImage.height,
          selected: false,
          reSize: false,
        });
        setSelectedElement(false);
      }

      for (let i = 0; i < elementsArray.length; i++) {
        if (
          clientX >= elementsArray[i].x + offset.x &&
          clientX <= elementsArray[i].x + offset.x + elementsArray[i].width &&
          clientY >= elementsArray[i].y + offset.y &&
          clientY <= elementsArray[i].y + offset.y + elementsArray[i].height
        ) {
          elementsArray[i].selected = true;
          setActiveElement(i);
          setMovingObject(true);
        } else {
          elementsArray[i].selected = false;
        }
      }

      for (let i = 0; i < elementsArray.length; i++) {
        if (elementsArray[i].reSize !== false) {
          setResizingObject(i);
          setPanning(false);
          setMovingObject(false);
        }
      }
    }
  };
  const handleMouseUp = () => {
    setPanning(false);
    setIsMouseDown(false);
    setResizingObject(false);
    setMovingObject(false);
    setMovingLinesArrayPoint(false);
  };
  const keyPressed = (e) => {
    setKeyPress({ value: e.key });
  };

  const isNearCanvas = (mousePosition, point, radius) => {
    const canvasMouseX = mousePosition.x;
    const canvasMouseY = mousePosition.y;
    const canvasPointX = point.x + offset.x;
    const canvasPointY = point.y + offset.y;
    const distanceSquared =
      (canvasMouseX - canvasPointX) ** 2 + (canvasMouseY - canvasPointY) ** 2;
    return distanceSquared <= radius ** 2;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#0D0D0D";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FF0000";
    context.fillRect(500 + offset.x, 500 + offset.y, 70, 70);

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
    if (active == "home") {
      setCursorStyle("grab");
    }
    if (active === "edit") {
      setCursorStyle("grab");
      const infoChart = {
        roundTable: { height: 50, width: 50 },
        squareTable: { height: 50, width: 50 },
        rectangleTable: { height: 50, width: 70 },
        chair: { height: 20, width: 30 },
        highChair: { height: 25, width: 25 },
        sofa: { height: 30, width: 70 },
      };
      if (selectedElement != false) {
        //to draw the element
        switch (selectedElement) {
          case "Round Table":
            HoverEditImage.src = roundTable;
            hoverImage.width = infoChart.roundTable.width;
            hoverImage.height = infoChart.roundTable.height;
            break;
          case "Square Table":
            HoverEditImage.src = squareTable;
            hoverImage.width = infoChart.squareTable.width;
            hoverImage.height = infoChart.squareTable.height;
            break;
          case "Rectangle Table":
            HoverEditImage.src = rectangleTable;
            hoverImage.width = infoChart.rectangleTable.width;
            hoverImage.height = infoChart.rectangleTable.height;
            break;
          case "Chair":
            HoverEditImage.src = chair;
            hoverImage.width = infoChart.chair.width;
            hoverImage.height = infoChart.chair.height;
            break;
          case "High Chair":
            HoverEditImage.src = highChair;
            hoverImage.width = infoChart.highChair.width;
            hoverImage.height = infoChart.highChair.height;
            break;
          case "Sofa":
            HoverEditImage.src = sofa;
            hoverImage.width = infoChart.sofa.width;
            hoverImage.height = infoChart.sofa.height;
            break;
        }
        context.drawImage(
          HoverEditImage,
          mousePosition.x - hoverImage.width / 2,
          mousePosition.y - hoverImage.height / 2,
          hoverImage.width,
          hoverImage.height,
        );
      }
      for (let i = 0; i < elementsArray.length; i++) {
        //drawing the lines and corner circle on hover | selecting element
        if (
          (mousePosition.x >= elementsArray[i].x + offset.x &&
            mousePosition.x <=
              elementsArray[i].x + offset.x + elementsArray[i].width &&
            mousePosition.y >= elementsArray[i].y + offset.y &&
            mousePosition.y <=
              elementsArray[i].y + offset.y + elementsArray[i].height) ||
          elementsArray[i].selected
        ) {
          context.strokeStyle = "#3F12D7";
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(
            elementsArray[i].x + offset.x,
            elementsArray[i].y + offset.y,
          );
          context.lineTo(
            elementsArray[i].x + offset.x + elementsArray[i].width,
            elementsArray[i].y + offset.y,
          );
          context.lineTo(
            elementsArray[i].x + offset.x + elementsArray[i].width,
            elementsArray[i].y + offset.y + elementsArray[i].height,
          );
          context.lineTo(
            elementsArray[i].x + offset.x,
            elementsArray[i].y + offset.y + elementsArray[i].height,
          );
          context.lineTo(
            elementsArray[i].x + offset.x,
            elementsArray[i].y + offset.y,
          );
          context.stroke();
          context.drawImage(
            inActiveDotImage,
            elementsArray[i].x + offset.x - 7,
            elementsArray[i].y + offset.y - 7,
            14,
            14,
          );
          context.drawImage(
            inActiveDotImage,
            elementsArray[i].x + offset.x - 7 + elementsArray[i].width,
            elementsArray[i].y + offset.y - 7,
            14,
            14,
          );
          context.drawImage(
            inActiveDotImage,
            elementsArray[i].x + offset.x - 7 + elementsArray[i].width,
            elementsArray[i].y + offset.y - 7 + elementsArray[i].height,
            14,
            14,
          );
          context.drawImage(
            inActiveDotImage,
            elementsArray[i].x + offset.x - 7,
            elementsArray[i].y + offset.y - 7 + elementsArray[i].height,
            14,
            14,
          );
          setPanning(false);
        }
        //the wierd cursor for resizing
        if (
          mousePosition.x - 6 <= elementsArray[i].x + offset.x &&
          mousePosition.x + 6 >= elementsArray[i].x + offset.x &&
          mousePosition.y - 6 <= elementsArray[i].y + offset.y &&
          mousePosition.y + 6 >= elementsArray[i].y + offset.y
        ) {
          elementsArray[i].reSize = "nw";
          setCursorStyle("nw-resize");
        } else if (
          mousePosition.x - 6 <=
            elementsArray[i].x + offset.x + elementsArray[i].width &&
          mousePosition.x + 6 >=
            elementsArray[i].x + offset.x + elementsArray[i].width &&
          mousePosition.y - 6 <= elementsArray[i].y + offset.y &&
          mousePosition.y + 6 >= elementsArray[i].y + offset.y
        ) {
          setCursorStyle("ne-resize");
          elementsArray[i].reSize = "ne";
        } else if (
          mousePosition.x - 6 <=
            elementsArray[i].x + offset.x + elementsArray[i].width &&
          mousePosition.x + 6 >=
            elementsArray[i].x + offset.x + elementsArray[i].width &&
          mousePosition.y - 6 <=
            elementsArray[i].y + offset.y + elementsArray[i].height &&
          mousePosition.y + 6 >=
            elementsArray[i].y + offset.y + elementsArray[i].height
        ) {
          setCursorStyle("se-resize");
          elementsArray[i].reSize = "se";
        } else if (
          mousePosition.x - 6 <= elementsArray[i].x + offset.x &&
          mousePosition.x + 6 >= elementsArray[i].x + offset.x &&
          mousePosition.y - 6 <=
            elementsArray[i].y + offset.y + elementsArray[i].height &&
          mousePosition.y + 6 >=
            elementsArray[i].y + offset.y + elementsArray[i].height
        ) {
          setCursorStyle("sw-resize");
          elementsArray[i].reSize = "sw";
        } else if (
          mousePosition.x - 6 <= elementsArray[i].x + offset.x &&
          mousePosition.x + 6 >= elementsArray[i].x + offset.x &&
          mousePosition.y >= elementsArray[i].y + offset.y &&
          mousePosition.y <=
            elementsArray[i].y + offset.y + elementsArray[i].height
        ) {
          setCursorStyle("w-resize");
          elementsArray[i].reSize = "w";
        } else if (
          mousePosition.x - 6 <=
            elementsArray[i].x + offset.x + elementsArray[i].width &&
          mousePosition.x + 6 >=
            elementsArray[i].x + offset.x + elementsArray[i].width &&
          mousePosition.y >= elementsArray[i].y + offset.y &&
          mousePosition.y <=
            elementsArray[i].y + offset.y + elementsArray[i].height
        ) {
          setCursorStyle("e-resize");
          elementsArray[i].reSize = "e";
        } else if (
          mousePosition.x >= elementsArray[i].x + offset.x &&
          mousePosition.x <=
            elementsArray[i].x + offset.x + elementsArray[i].width &&
          mousePosition.y - 6 <= elementsArray[i].y + offset.y &&
          mousePosition.y + 6 >= elementsArray[i].y + offset.y
        ) {
          setCursorStyle("n-resize");
          elementsArray[i].reSize = "n";
        } else if (
          mousePosition.x >= elementsArray[i].x + offset.x &&
          mousePosition.x <=
            elementsArray[i].x + offset.x + elementsArray[i].width &&
          mousePosition.y - 6 <=
            elementsArray[i].y + offset.y + elementsArray[i].height &&
          mousePosition.y + 6 >=
            elementsArray[i].y + offset.y + elementsArray[i].height
        ) {
          setCursorStyle("s-resize");
          elementsArray[i].reSize = "s";
        } else {
          elementsArray[i].reSize = false;
        }
      }
      for (let i = 0; i < linesArray.length; i++) {
        for (let j = 0; j < linesArray[i].length; j++) {
          if (isNearCanvas(mousePosition, linesArray[i][j], 15)) {
            if (isMouseDown) {
              setMovingLinesArrayPoint({ i: i, j: j });
              setPanning(false);
            } else {
              context.drawImage(
                activeDotImage,
                linesArray[i][j].x + offset.x - 7,
                linesArray[i][j].y + offset.y - 7,
                14,
                14,
              );
            }
          }
        }
      }
    }
    if (active === "draw") {
      setCursorStyle("default");

      if (keyPress.value === "Escape") {
        setActive("home");
        setLastClick({ x: false, y: false });
        if (
          linesArray[linesArray.length - 1][
            linesArray[linesArray.length - 1].length - 1
          ].x != false
        ) {
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
        handleMouseDown({ clientX: mousePosition.x, clientY: mousePosition.y });
        handleMouseUp();
        setKeyPress({ value: false });
        setLastClick({ x: false, y: false });
        setActive("home");
        if (
          linesArray[linesArray.length - 1][
            linesArray[linesArray.length - 1].length - 1
          ].x != false
        ) {
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

      //draw the active dot
      context.drawImage(
        activeDotImage,
        mousePosition.x - 7,
        mousePosition.y - 7,
        14,
        14,
      );
    }

    for (let i = 0; i < elementsArray.length; i++) {
      context.drawImage(
        elementsArray[i].image,
        elementsArray[i].x + offset.x,
        elementsArray[i].y + offset.y,
        elementsArray[i].width,
        elementsArray[i].height,
      );
    }
    console.log(movingLinesArrayPoint);
  }, [mousePosition, active, lastClick, keyPress, initialization]);

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

  useEffect(() => {
    setInitialization(true);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={keyPressed}
      onTouchMove={onTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{
        cursor: cursorStyle,
      }}
    />
  );
};

export default Draw;
