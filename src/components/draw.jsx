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
import InfoBox from "./infoBox";
import HomeReserve from "./homeReserve";

const Draw = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [linesArray, setLinesArray] = useState([[{ x: false, y: false }]]);
  const [lastClick, setLastClick] = useState({ x: false, y: false });
  const [selectedElement, setSelectedElement] = useState(false);
  const [elementsArray, setElementsArray] = useState([]);
  const [activeElement, setActiveElement] = useState(false);
  const [keyPress, setKeyPress] = useState({ value: false });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [resizingObject, setResizingObject] = useState(false);
  const [color, setColor] = useState({
    home: { backgroundColor: "white", color: "#3B3939" },
    edit: { backgroundColor: "#3B3939", color: "white" },
    draw: { backgroundColor: "#3B3939", color: "white" },
    setting: { backgroundColor: "#3B3939", color: "white" },
  });

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
        mousePosition={mousePosition}
        setMousePosition={setMousePosition}
        resizingObject={resizingObject}
        setResizingObject={setResizingObject}
      />
      <Instructions active={activeNav} />
      <BottomBar />
      <EditLayout
        active={activeNav}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
      <InfoBox
        activeNav={activeNav}
        activeElement={activeElement}
        elementsArray={elementsArray}
        resizingObject={resizingObject}
      />
      <HomeReserve
        activeElement={activeElement}
        activeNav={activeNav}
        elementsArray={elementsArray}
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
  mousePosition,
  setMousePosition,
  resizingObject,
  setResizingObject,
}) => {
  const activeDotImage = new Image();
  const inActiveDotImage = new Image();
  const HoverEditImage = new Image();
  activeDotImage.src = activeDot;
  inActiveDotImage.src = inActiveDot;

  const canvasRef = useRef(null);
  const [panning, setPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [initialization, setInitialization] = useState(false);

  const hoverImage = { height: 0, width: 0 };
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("grab");

  const [movingObject, setMovingObject] = useState(false);
  const [movingLinesArrayPoint, setMovingLinesArrayPoint] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#0D0D0D";
    context.fillRect(0, 0, canvas.width, canvas.height);

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
    for (let i = 0; i < elementsArray.length; i++) {
      context.drawImage(
        elementsArray[i].image,
        elementsArray[i].x + offset.x,
        elementsArray[i].y + offset.y,
        elementsArray[i].width,
        elementsArray[i].height,
      );
    }
    if (active == "home") {
      setCursorStyle("grab");
      for (let i = 0; i < elementsArray.length; i++) {
        if (
          isNearObject(mousePosition, elementsArray[i], 20) ||
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
          setPanning(false);
        }
      }
    }
    if (active === "edit") {
      setCursorStyle("grab");
      if (selectedElement != false) {
        const infoChart = {
          roundTable: { height: 50, width: 50 },
          squareTable: { height: 50, width: 50 },
          rectangleTable: { height: 50, width: 70 },
          chair: { height: 20, width: 30 },
          highChair: { height: 25, width: 25 },
          sofa: { height: 30, width: 70 },
        };
        switch (selectedElement) {
          case "Round Table":
            HoverEditImage.src = roundTable;
            hoverImage.width = infoChart.roundTable.width;
            hoverImage.height = infoChart.roundTable.height;
            hoverImage.title = "Round Table";
            break;
          case "Square Table":
            HoverEditImage.src = squareTable;
            hoverImage.width = infoChart.squareTable.width;
            hoverImage.height = infoChart.squareTable.height;
            hoverImage.title = "Sqaure Table";
            break;
          case "Rectangle Table":
            HoverEditImage.src = rectangleTable;
            hoverImage.width = infoChart.rectangleTable.width;
            hoverImage.height = infoChart.rectangleTable.height;
            hoverImage.title = "Rectangle Table";
            break;
          case "Chair":
            HoverEditImage.src = chair;
            hoverImage.width = infoChart.chair.width;
            hoverImage.height = infoChart.chair.height;
            hoverImage.title = "Chair";
            break;
          case "High Chair":
            HoverEditImage.src = highChair;
            hoverImage.width = infoChart.highChair.width;
            hoverImage.height = infoChart.highChair.height;
            hoverImage.title = "High Chair";
            break;
          case "Sofa":
            HoverEditImage.src = sofa;
            hoverImage.width = infoChart.sofa.width;
            hoverImage.height = infoChart.sofa.height;
            hoverImage.title = "Sofa";
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
        if (
          isNearObject(mousePosition, elementsArray[i], 20) ||
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
          if (
            isNearPoint(mousePosition, linesArray[i][j], 15) &&
            movingObject === false
          ) {
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
    if (active === "draw" || active === "edit") {
      if (keyPress.value === "Backspace") {
        setKeyPress({ value: false });
        elementsArray.splice(activeElement, 1);
        setActiveElement(false);
      }
    }
  }, [mousePosition, active, lastClick, keyPress, initialization]);

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
      movingObject
    ) {
      // to grab and move elements fix the mouse posting when it is not in the center
      elementsArray[activeElement].x =
        e.clientX - offset.x - elementsArray[activeElement].width / 2;
      elementsArray[activeElement].y =
        e.clientY - offset.y - elementsArray[activeElement].height / 2;
    }

    // NEVER TOUCH THIS RESIZING CODE PLZ also fix the negative heigh | width problem | somewhat fixed those issues
    if (resizingObject !== false && isMouseDown && active == "edit") {
      if (elementsArray[resizingObject].reSize === "n") {
        const ogBottom =
          elementsArray[resizingObject].y +
          elementsArray[resizingObject].height;
        const newHeight = ogBottom - e.clientY + offset.y;
        elementsArray[resizingObject].y = e.clientY - offset.y;
        elementsArray[resizingObject].height = Math.abs(newHeight);
      } else if (elementsArray[resizingObject].reSize === "ne") {
        const ogBottom =
          elementsArray[resizingObject].y +
          elementsArray[resizingObject].height;
        const newHeight = ogBottom - e.clientY + offset.y;
        elementsArray[resizingObject].y = e.clientY - offset.y;
        elementsArray[resizingObject].height = Math.abs(newHeight);
        elementsArray[resizingObject].width = Math.abs(
          e.clientX - elementsArray[resizingObject].x - offset.x,
        );
      } else if (elementsArray[resizingObject].reSize === "e") {
        elementsArray[resizingObject].width = Math.abs(
          e.clientX - elementsArray[resizingObject].x - offset.x,
        );
      } else if (elementsArray[resizingObject].reSize === "se") {
        elementsArray[resizingObject].width = Math.abs(
          e.clientX - elementsArray[resizingObject].x - offset.x,
        );
        elementsArray[resizingObject].height = Math.abs(
          e.clientY - elementsArray[resizingObject].y - offset.y,
        );
      } else if (elementsArray[resizingObject].reSize === "s") {
        elementsArray[resizingObject].height = Math.abs(
          e.clientY - elementsArray[resizingObject].y - offset.y,
        );
      } else if (elementsArray[resizingObject].reSize === "sw") {
        elementsArray[resizingObject].height = Math.abs(
          e.clientY - elementsArray[resizingObject].y - offset.y,
        );
        const ogRight =
          elementsArray[resizingObject].x + elementsArray[resizingObject].width;
        const newWidth = ogRight - e.clientX + offset.x;
        elementsArray[resizingObject].x = e.clientX - offset.x;
        elementsArray[resizingObject].width = Math.abs(newWidth);
      } else if (elementsArray[resizingObject].reSize === "w") {
        const ogRight =
          elementsArray[resizingObject].x + elementsArray[resizingObject].width;
        const newWidth = ogRight - e.clientX + offset.x;
        elementsArray[resizingObject].x = e.clientX - offset.x;
        elementsArray[resizingObject].width = Math.abs(newWidth);
      } else if (elementsArray[resizingObject].reSize === "nw") {
        const ogBottom =
          elementsArray[resizingObject].y +
          elementsArray[resizingObject].height;
        const newHeight = ogBottom - e.clientY + offset.y;
        elementsArray[resizingObject].y = e.clientY - offset.y;
        elementsArray[resizingObject].height = Math.abs(newHeight);
        const ogRight =
          elementsArray[resizingObject].x + elementsArray[resizingObject].width;
        const newWidth = ogRight - e.clientX + offset.x;
        elementsArray[resizingObject].x = e.clientX - offset.x;
        elementsArray[resizingObject].width = Math.abs(newWidth);
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

    if (active === "home") {
      for (let i = 0; i < elementsArray.length; i++) {
        if (
          clientX >= elementsArray[i].x + offset.x &&
          clientX <= elementsArray[i].x + offset.x + elementsArray[i].width &&
          clientY >= elementsArray[i].y + offset.y &&
          clientY <= elementsArray[i].y + offset.y + elementsArray[i].height
        ) {
          elementsArray[i].selected = true;
          setActiveElement(i);
        } else {
          elementsArray[i].selected = false;
        }
      }
      const reset = (elementsArray) => {
        for (let i = 0; i < elementsArray.length; i++) {
          if (elementsArray[i].selected === true) return;
        }
        setActiveElement(false);
        return;
      };
      reset(elementsArray);
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
      if (selectedElement !== false) {
        elementsArray.push({
          image: HoverEditImage,
          x: clientX - offset.x - hoverImage.width / 2,
          y: clientY - offset.y - hoverImage.height / 2,
          width: hoverImage.width,
          height: hoverImage.height,
          selected: false,
          reSize: false,
          title: hoverImage.title,
          reservation: [],
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

      const reset = (elementsArray) => {
        for (let i = 0; i < elementsArray.length; i++) {
          if (elementsArray[i].selected === true) return;
        }
        setActiveElement(false);
        return;
      };

      reset(elementsArray);
    }
  };
  const handleMouseUp = () => {
    setPanning(false);
    setIsMouseDown(false);
    setResizingObject(false);
    setMovingObject(false);
    setMovingLinesArrayPoint(false);
  };
  const isNearPoint = (mousePosition, point, radius) => {
    const canvasMouseX = mousePosition.x;
    const canvasMouseY = mousePosition.y;
    const canvasPointX = point.x + offset.x;
    const canvasPointY = point.y + offset.y;
    const distanceSquared =
      (canvasMouseX - canvasPointX) ** 2 + (canvasMouseY - canvasPointY) ** 2;
    return distanceSquared <= radius ** 2;
  };
  const isNearObject = (mousePosition, object, radius) => {
    if (
      mousePosition.x >= object.x + offset.x &&
      mousePosition.x <= object.x + offset.x + object.width &&
      mousePosition.y >= object.y + offset.y &&
      mousePosition.y <= object.y + offset.y + object.height
    ) {
      return true;
    } else {
      return false;
    }
  };
  const keyPressed = (e) => {
    setKeyPress({ value: e.key });
  };

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
