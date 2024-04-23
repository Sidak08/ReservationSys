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
  // const [infoId, setInfoId] = useState(0);
  const [info, setInfo] = useState({
    name: [],
    phone: [],
    email: [],
    notes: [],
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

  const handleNumPeopleChange = (e) => {
    const input = e.target.value;
    info.people = input;
    setInfo(info);
  };

  const handleClose = () => {
    setChangeRsvp(false);
  };

  useEffect(() => {
    if (changeRsvp === false) {
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
  }, [changeRsvp]);

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
      <BookInfoInputBox info={info} heading="Name" setInfo={setInfo} />
      <BookInfoInputBox info={info} heading="Email" setInfo={setInfo} />
      <BookInfoInputBox info={info} heading="Phone" setInfo={setInfo} />
      <BookInfoInputBox info={info} heading="Notes" setInfo={setInfo} />
      <div id="homeReserveBookInfoPeopleInput">
        <h4> Number Of People </h4>
        <input onChange={handleNumPeopleChange} value={info.people} />
      </div>
      <h1> change time</h1>
    </div>
  );
};

const BookInfoInputBox = ({ info, heading, setInfo }) => {
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

  const addElement = () => {
    info[heading.toLowerCase()].push(" ");
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
