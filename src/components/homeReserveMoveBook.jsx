import "./homeReserveMoveBook.css";
import { useState, useEffect } from "react";
import { CloseSvg } from "./svg.jsx";
const ChangeBookInfo = ({
  activeNav,
  changeRsvp,
  setChangeRsvp,
  elementsArray,
  upComingReservations,
}) => {
  const [animate, setAnimate] = useState(false);
  const [infoId, setInfoId] = useState(0);
  const [info, setInfo] = useState({
    name: [],
    phone: [],
    email: [],
    notes: [],
    people: 1,
    id: 0,
    people: 1,
  });

  useEffect(() => {
    if (changeRsvp && activeNav === "home") {
      setAnimate(true);
      setInfo(changeRsvp);
    } else {
      setAnimate(false);
    }
  }, [changeRsvp, activeNav]);

  useEffect(() => {
    if (changeRsvp !== false) {
      for (let i = 0; i < elementsArray.length; i++) {
        if (elementsArray[i].id === changeRsvp.tableId) {
          for (let j = 0; j < elementsArray[i].reservation.length; j++) {
            if (elementsArray[i].reservation[j].id === changeRsvp.id) {
              elementsArray[i].reservation[j] = info;
            }
          }
        }
      }
      for (let i = 0; i < upComingReservations.length; i++) {
        if (upComingReservations[i].id === changeRsvp.id) {
          upComingReservations[i] = info;
        }
      }
    }
  }, [info]);

  const [numPeople, setNumPeople] = useState(1);

  const handleNumPeopleChange = (e) => {
    const input = e.target.value;
    info.people = parseInt(input);
    setNumPeople(input);
  };

  const handleClose = () => {
    setInfo({
      name: [],
      phone: [],
      email: [],
      notes: [],
      people: 1,
    });
    setChangeRsvp(false);
  };

  return (
    <div className={`homeReserveBookInfo ${animate ? "animate" : ""}`}>
      <button onClick={handleClose} className="BookInfoClose">
        <CloseSvg />
      </button>
      <div id="homeReserveBookInfoHeader">
        <h2>Edit Info</h2>
        <div>
          <h4>{info.startDate}</h4> <h4>{info.startTime}</h4>
        </div>
      </div>
      <div id="homeReserveBookInfoHeaderLine" />
      <BookInfoInputBox info={info} heading="Name" />
      <BookInfoInputBox info={info} heading="Email" />
      <BookInfoInputBox info={info} heading="Phone" />
      <BookInfoInputBox info={info} heading="Notes" />
      <div id="homeReserveBookInfoPeopleInput">
        <h4> Number Of People </h4>
        <input onChange={handleNumPeopleChange} value={numPeople} />
      </div>
      <h1> change time</h1>
    </div>
  );
};

const BookInfoInputBox = ({ info, heading }) => {
  const [rsvpId, setRsvpId] = useState(0);
  const [num, setNum] = useState(
    info[heading.toLowerCase()].length === 0
      ? 1
      : info[heading.toLowerCase()].length,
  );

  useEffect(() => {
    if (rsvpId !== info.id) {
      setNum(
        info[heading.toLowerCase()].length === 0
          ? 1
          : info[heading.toLowerCase()].length,
      );
      setRsvpId(info.id);
    }
  }, [info]);

  const handleChange = (e, key) => {
    const input = e.target.value;
    info[heading.toLowerCase()][key] = input;
  };
  const addElement = () => {
    info[heading.toLowerCase()].push("");
    setNum(num + 1);
  };
  const inputs = Array.from(
    {
      length: num,
    },
    (_, index) => (
      <input
        key={index}
        className="homeReserveInputBox"
        value={info[heading.toLowerCase()][index]}
        onChange={(e) => {
          handleChange(e, index);
        }}
      />
    ),
  );

  return (
    <div className="homeReserveInputBoxRealOutterDiv">
      <h4>{heading}</h4>
      <div className="homeReserveBookingInfoThinLine" />
      <div className="homeReserveInputBoxOutterDiv">
        <button onClick={addElement} className="homeReserveAddButton">
          +
        </button>
        <div>{inputs}</div>
      </div>
    </div>
  );
};

export default ChangeBookInfo;
