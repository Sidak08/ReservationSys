import "./homeReserveBookInfo.css";
import { useState, useEffect } from "react";
import { CloseSvg } from "./svg.jsx";
const BookInfo = ({
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
  setInfo,
  info,
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

  const handleNumPeopleChange = (e) => {
    info.people = e.target.value;
    setInfo(info);
  };

  const handleClose = () => {
    setRenderBookInfo(false);
  };

  useEffect(() => {
    if (renderBookInfo === false) {
      console.log("resetting");
      const tmp = {
        name: [],
        phone: [],
        email: [],
        notes: [],
        people: 1,
      };
      for (let i = 0; i < info.name.length; i++) {
        tmp.name[i] = "";
      }
      for (let i = 0; i < info.phone.length; i++) {
        tmp.phone[i] = "";
      }
      for (let i = 0; i < info.email.length; i++) {
        tmp.email[i] = "";
      }
      for (let i = 0; i < info.notes.length; i++) {
        tmp.notes[i] = "";
      }
      setInfo(tmp);
    }
  }, [renderBookInfo]);

  useEffect(() => {
    const isEmpty = (arr) => {
      if (arr.length === 0) {
        return false;
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== "") {
          return false;
        }
      }
      return true;
    };
    const tmp = {
      name: [],
      phone: [],
      email: [],
      notes: [],
      people: 1,
    };
    if (
      isEmpty(info.name) ||
      isEmpty(info.email) ||
      isEmpty(info.phone) ||
      isEmpty(info.notes)
    ) {
      setInfo(tmp);
    }
  }, [info]);

  return (
    <div
      className={`homeReserveBookInfo ${animate ? "animate" : ""} ${borderRed ? "redBorder" : ""}`}
    >
      <button onClick={handleClose} className="BookInfoClose">
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
        setInfo={setInfo}
      />
      <BookInfoInputBox
        addCounter={setNumEmail}
        count={numEmail}
        info={info}
        heading="Email"
        setInfo={setInfo}
      />
      <BookInfoInputBox
        addCounter={setNumPhone}
        count={numPhone}
        info={info}
        heading="Phone"
        setInfo={setInfo}
      />
      <BookInfoInputBox
        addCounter={setNumNotes}
        count={numNotes}
        info={info}
        heading="Notes"
        setInfo={setInfo}
      />
      <div id="homeReserveBookInfoPeopleInput">
        <h4> Number Of People </h4>
        <input value={info.people} onChange={handleNumPeopleChange} />
      </div>
    </div>
  );
};

const BookInfoInputBox = ({ addCounter, count, info, heading, setInfo }) => {
  const handleChange = (e, index) => {
    const input = e.target.value;
    const updatedInfo = { ...info };
    updatedInfo[heading.toLowerCase()] = [
      ...updatedInfo[heading.toLowerCase()],
    ];
    updatedInfo[heading.toLowerCase()][index] = input;
    setInfo(updatedInfo);
    console.log(info[heading.toLowerCase()][index]);
  };

  const inputs = Array.from({ length: count }, (_, index) => (
    <input
      key={index}
      className="homeReserveInputBox"
      value={info[heading.toLowerCase()][index]}
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
