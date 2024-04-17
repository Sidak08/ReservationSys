import React from "react";
import { useState, useEffect } from "react";
import "./infoBox.css";

const InfoBox = ({
  activeElement,
  setActiveElement,
  activeNav,
  elementsArray,
  resizingObject,
  upComingReservations,
}) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [lastActiveElement, setLastActiveElement] = useState(false);
  const [lastActiveElementInfo, setLastActiveElementInfo] = useState({
    title: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  //set up last info for the animation || include resizing

  useEffect(() => {
    setAnimationActive(
      (activeElement !== false &&
        activeNav === "edit" &&
        elementsArray.length > 0) ||
        (resizingObject !== false && activeNav === "edit"),
    );
  }, [activeElement, activeNav]);

  useEffect(() => {
    if (resizingObject === false) {
      setLastActiveElement(activeElement);
    }
    if (activeElement !== false) {
      setLastActiveElementInfo(elementsArray[activeElement]);
    }
  }, [activeElement]);

  const onDeleteClick = () => {
    if (activeElement !== false) {
      const rsvp = elementsArray[activeElement].reservation;
      elementsArray.splice(activeElement, 1);
      setActiveElement(false);
      for (let i = 0; i < upComingReservations.length; i++) {
        for (let j = 0; j < rsvp.length; j++) {
          if (upComingReservations[i].id === rsvp[j].id) {
            upComingReservations.splice(i, 1);
          }
        }
      }
    }
  };

  if (
    lastActiveElement !== false &&
    activeNav === "edit" &&
    activeElement !== false
  ) {
    return (
      <div className={`infoBoxDiv ${animationActive ? "animate" : ""}`}>
        <h1>{elementsArray[lastActiveElement].title}</h1>
        <div id="infoBoxLine"></div>
        <div id="infoBoxInfo">
          <div>
            <h4>X: {Math.round(elementsArray[lastActiveElement].x)}</h4>
            <h4>H: {Math.round(elementsArray[lastActiveElement].height)}</h4>
          </div>
          <div>
            <h4>Y: {Math.round(elementsArray[lastActiveElement].y)}</h4>
            <h4>W: {Math.round(elementsArray[lastActiveElement].width)}</h4>
          </div>
        </div>
        <button onClick={onDeleteClick} id="infoBoxDelete">
          Delete
        </button>
      </div>
    );
  } else {
    return (
      <div className={`infoBoxDiv ${animationActive ? "animate" : ""}`}>
        <h1>{lastActiveElementInfo.title}</h1>
        <div id="infoBoxLine"></div>
        <div id="infoBoxInfo">
          <div>
            <h4>X: {Math.round(lastActiveElementInfo.x)}</h4>
            <h4>H: {Math.round(lastActiveElementInfo.height)}</h4>
          </div>
          <div>
            <h4>Y: {Math.round(lastActiveElementInfo.y)}</h4>
            <h4>W: {Math.round(lastActiveElementInfo.width)}</h4>
          </div>
        </div>
        <button id="infoBoxDelete">Delete</button>
      </div>
    );
  }
};

export default InfoBox;
