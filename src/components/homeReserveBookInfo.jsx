import "./homeReserveBookInfo.css";
import { useState, useEffect } from "react";
import { CloseSvg } from "./svg.jsx";
const BookInfo = ({
  info,
  renderBookInfo,
  activeNav,
  setBorderRed,
  borderRed,
  setRenderBookInfo,
  bookDate,
  bookTime,
  numName,
  setNumName,
  numEmail,
  setNumEmail,
  numPhone,
  setNumPhone,
  numNotes,
  setNumNotes,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (renderBookInfo && activeNav === "home") {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [renderBookInfo, activeNav]);

  useEffect(() => {
    if (borderRed === true) {
      const timer = setTimeout(() => {
        setBorderRed(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [borderRed]);

  return (
    <div
      className={`homeReserveBookInfo ${animate ? "animate" : ""} ${borderRed ? "redBorder" : ""}`}
    >
      <button
        onClick={() => setRenderBookInfo(false)}
        className="BookInfoClose"
      >
        <CloseSvg />
      </button>
      <div id="homeReserveBookInfoHeader">
        <h2>Info</h2>
        <div>
          <h4>{bookDate}</h4> <h4>{bookTime}</h4>
        </div>
      </div>
      <div id="homeReserveBookInfoHeaderLine" />
      <BookInfoInputBox
        addCounter={setNumName}
        count={numName}
        info={info}
        heading="Name"
      />
      <BookInfoInputBox
        addCounter={setNumEmail}
        count={numEmail}
        info={info}
        heading="Email"
      />
      <BookInfoInputBox
        addCounter={setNumPhone}
        count={numPhone}
        info={info}
        heading="Phone"
      />
      <BookInfoInputBox
        addCounter={setNumNotes}
        count={numNotes}
        info={info}
        heading="Notes"
      />
    </div>
  );
};

const BookInfoInputBox = ({ addCounter, count, info, heading }) => {
  const handleChange = (e, key) => {
    const input = e.target.value;
    info[heading.toLowerCase()][key] = input;
  };
  const inputs = Array.from({ length: count }, (_, index) => (
    <input
      key={index}
      className="homeReserveInputBox"
      onChange={(e) => {
        handleChange(e, index);
      }}
    />
  ));

  return (
    <div className="homeReserveInputBoxRealOutterDiv">
      <h4>{heading}</h4>
      <div className="homeReserveBookingInfoThinLine" />
      <div className="homeReserveInputBoxOutterDiv">
        <button
          onClick={() => addCounter(count + 1)}
          className="homeReserveAddButton"
        >
          +
        </button>
        <div>{inputs}</div>
      </div>
    </div>
  );
};

export default BookInfo;
