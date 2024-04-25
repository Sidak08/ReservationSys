import { useEffect, useState } from "react";
import "./homeReserveMoveTime.css";
import { CloseSvg } from "./svg";

const ChangeTime = ({
  activeNav,
  elementsArray,
  upComingRersevation,
  renderChangeTime,
  setRenderChangeTime,
}) => {
  const [animate, setAnimate] = useState(false);
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [spotAval, setSpotAval] = useState(false);

  const handleDateChange = (e) => {};
  const handleTimeChange = (e) => {};
  const handleClose = () => {
    setRenderChangeTime(false);
  };

  useEffect(() => {
    renderChangeTime !== false && activeNav === "home"
      ? setAnimate(true)
      : setAnimate(false);
  }, [renderChangeTime, activeNav]);

  return (
    <div className={`homeReserveChangeTime ${animate ? "animate" : ""}`}>
      <div id="homeReserve_bookSpotDiv">
        <h1>Book spot</h1>
        <div className="homeReserveLine" />
        <div id="homeReserve_bookSpotTimeSlotDiv">
          <input
            type="date"
            id="homeReserve_bookSpotDivDate"
            onChange={handleDateChange}
            value={bookDate}
          />
          <input
            type="time"
            id="homeReserve_bookSpotDivTime"
            onChange={handleTimeChange}
            value={bookTime}
          />
          <div
            id="homeReserve_avalibility"
            className={spotAval ? "homeReserve_green" : "homeReserve_red"}
          />
        </div>
      </div>
      <button onClick={handleClose} className="homeReserveMoveTimeClose">
        <CloseSvg />
      </button>
    </div>
  );
};

export default ChangeTime;
