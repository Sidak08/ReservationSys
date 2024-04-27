import "./infoboxLines.css";
import { useEffect, useState } from "react";

const InfoBoxLines = ({
  movingLinesArrayPoint,
  setMovingLinesArrayPoint,
  activeNav,
  linesArray,
}) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [lastInfo, setLastInfo] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (movingLinesArrayPoint !== false && activeNav === "edit") {
      setAnimationActive(true);
    } else {
      setAnimationActive(false);
    }
  }, [movingLinesArrayPoint, activeNav]);

  useEffect(() => {
    if (movingLinesArrayPoint !== false) {
      setLastInfo(linesArray[movingLinesArrayPoint.i][movingLinesArrayPoint.j]);
    }
  }, [movingLinesArrayPoint]);

  const onDeleteClick = () => {
    if (movingLinesArrayPoint !== false) {
      console.log(movingLinesArrayPoint);
      console.log(linesArray);
      linesArray[movingLinesArrayPoint.i].splice(movingLinesArrayPoint.j, 1);
      setMovingLinesArrayPoint(false);
    }
  };

  return (
    <div className={`infoBoxLinesDiv ${animationActive ? "animate" : ""}`}>
      <div id="infoBoxLinesFlex">
        <h3> Point </h3>
        <div>
          <h4>X: {Math.round(lastInfo.x)}</h4>
          <h4>Y: {Math.round(lastInfo.y)}</h4>
        </div>
      </div>
      <button onClick={onDeleteClick} id="infoBoxLinesDelete">
        Delete
      </button>
    </div>
  );
};

export default InfoBoxLines;
