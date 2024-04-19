import "./infoboxLines.css";
import { useEffect, useState } from "react";

const InfoBoxLines = ({ movingLinesArrayPoint, activeNav, linesArray }) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [lastInfo, setLastInfo] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (movingLinesArrayPoint !== false && activeNav === "edit") {
      console.log(movingLinesArrayPoint);
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
      const dot =
        linesArray[movingLinesArrayPoint.i][movingLinesArrayPoint.j]
          .reservation;
    }
  };

  return (
    <div className={`infoBoxLinesDiv ${animationActive ? "animate" : ""}`}>
      <h1>{lastInfo.x}</h1>
      <h1>{lastInfo.y}</h1>
    </div>
  );
};

export default InfoBoxLines;
