import "./homeReserveBookShowInfo.css";
import { useState, useEffect } from "react";
import { CloseSvg } from "./svg.jsx";

const BookShowInfo = ({
  activeRsvp,
  setActiveRsvp,
  activeNav,
  upComingReservations,
  elementsArray,
}) => {
  const [animation, setAnimation] = useState(false);
  const [lastActiveRsvp, setLastActiveRsvp] = useState({
    startDate: "",
    startTime: "",
    endTime: "",
    endDate: "",
    name: [],
    email: [],
    phone: [],
    notes: [],
    people: 1,
  });

  useEffect(() => {
    if (activeRsvp !== false && activeNav === "home") {
      setAnimation(true);
    } else {
      setAnimation(false);
    }
  }, [activeRsvp, activeNav]);

  useEffect(() => {
    if (activeRsvp !== false) {
      setLastActiveRsvp(activeRsvp);
    }
  }, [activeRsvp]);

  const onDelete = () => {
    for (let i = 0; i < upComingReservations.length; i++) {
      if (upComingReservations[i].id === activeRsvp.id) {
        upComingReservations.splice(i, 1);
      }
    }
    for (let i = 0; i < elementsArray.length; i++) {
      if (elementsArray[i].id === activeRsvp.tableId) {
        for (let j = 0; j < elementsArray[i].reservation.length; j++) {
          if (elementsArray[i].reservation[j].id === activeRsvp.id) {
            elementsArray[i].reservation.splice(j, 1);
          }
        }
      }
    }
    console.log(activeRsvp);
    setActiveRsvp(false);
  };

  return (
    <div className={`bookShowInfo ${animation ? "animate" : ""}`}>
      <button
        className="showBookInfoClose"
        onClick={() => setActiveRsvp(false)}
      >
        <CloseSvg />
      </button>
      <div className="bookShowInfoHeader">
        <h1>Info</h1>
        <div>
          <h4>
            {activeRsvp.startTime}-{activeRsvp.endTime}
          </h4>
          <h4>{activeRsvp.startDate}</h4>
        </div>
      </div>
      <div className="homeReserveLine" />
      <BookShowInfoBox title="Name" info={lastActiveRsvp.name} />
      <BookShowInfoBox title="Email" info={lastActiveRsvp.email} />
      <BookShowInfoBox title="Phone Number" info={lastActiveRsvp.phone} />
      <BookShowInfoBox title="Notes" info={lastActiveRsvp.notes} />
      <div className="bookShowInfoNumPeopleDivFlex">
        <div className="bookShowInfoNumPeopleDiv">
          <h4>Number of people:</h4>
          <h4>{lastActiveRsvp.people}</h4>
        </div>
      </div>
      <div className="bookShowInfoBtnDiv">
        <button>Change</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

const BookShowInfoBox = ({ info, title }) => {
  return (
    <div className="bookShowInfoBoxDiv">
      <h4>{title}</h4>
      <div className="homeReserveShowInfoThinLine" />
      <div className="bookShowInfoFlexItemBox">
        {info.map((item, index) => (
          <div key={index} className="bookShowInfoBoxText">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookShowInfo;
