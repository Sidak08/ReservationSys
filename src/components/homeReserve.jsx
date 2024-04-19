import "./homeReserve.css";
import { useEffect, useState } from "react";
import BookInfo from "./homeReserveBookInfo";
import BookSpot from "./homeReserveBookSpot";
import BookShowInfo from "./homeReserveBookShowInfo";

// ON DELETE RMOVE THE UPCOMING RESERVATIONS

const HomeReserve = ({
  activeElement,
  activeNav,
  elementsArray,
  upComingReservations,
  setElementsArray,
}) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [lastActiveElement, setLastActiveElement] = useState(false);
  const [lastActiveElementInfo, setLastActiveElementInfo] = useState({
    title: "",
  });
  const [forceRerender, setForceRerender] = useState(1);
  const bookLength = 120;
  const [upComingReserveAni, setUpComingReserveAni] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    name: [],
    phone: [],
    email: [],
    notes: [],
    people: 1,
  });
  const [renderBookInfo, setRenderBookInfo] = useState(false);
  const [borderRed, setBorderRed] = useState(false);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const time = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;

  const [bookDate, setBookDate] = useState(`${year}-${month}-${day}`);
  const [bookTime, setBookTime] = useState(time);

  const [numName, setNumName] = useState(1);
  const [numEmail, setNumEmail] = useState(1);
  const [numPhone, setNumPhone] = useState(1);
  const [numNotes, setNumNotes] = useState(1);

  const [activeRsvp, setActiveRsvp] = useState(false);

  useEffect(() => {
    if (
      activeElement !== false &&
      activeNav === "home" &&
      elementsArray.length > 0
    ) {
      setAnimationActive(true);
    } else {
      setAnimationActive(false);
      setRenderBookInfo(false);
    }
  }, [activeElement, activeNav]);

  useEffect(() => {
    if (activeElement !== false) {
      setLastActiveElement(activeElement);
      setLastActiveElementInfo(elementsArray[activeElement]);
    }
  }, [activeElement, activeNav]);

  useEffect(() => {
    if (activeNav === "home" && upComingReservations.length > 0) {
      setUpComingReserveAni(true);
    } else {
      setUpComingReserveAni(false);
    }
  }, [upComingReservations, activeNav, forceRerender]);

  if (
    lastActiveElement !== false &&
    activeNav === "home" &&
    activeElement !== false
  ) {
    return (
      <>
        <div className={`homeReserveDiv ${animationActive ? "animate" : ""}`}>
          <h1>{elementsArray[lastActiveElement].title}</h1>
          <div id="homeReserveStatusDiv">
            <h4>Status</h4>
            <div className="homeReserveLine" />
            <StatusDiv
              info={elementsArray[lastActiveElement].reservation}
              activeRsvp={activeRsvp}
              setActiveRsvp={setActiveRsvp}
              id={elementsArray[lastActiveElement].id}
            />
          </div>
          <BookSpot
            activeElement={activeElement}
            elementsArray={elementsArray}
            upComingReservations={upComingReservations}
            setElementsArray={setElementsArray}
            forceRerender={forceRerender}
            setForceRerender={setForceRerender}
            bookLength={bookLength}
            bookingInfo={bookingInfo}
            renderBookInfo={renderBookInfo}
            setRenderBookInfo={setRenderBookInfo}
            setBorderRed={setBorderRed}
            borderRed={borderRed}
            bookDate={bookDate}
            setBookDate={setBookDate}
            bookTime={bookTime}
            setBookTime={setBookTime}
            numName={numName}
            setNumName={setNumName}
            numEmail={numEmail}
            setNumEmail={setNumEmail}
            numPhone={numPhone}
            setNumPhone={setNumPhone}
            numNotes={numNotes}
            setNumNotes={setNumNotes}
          />
        </div>
        <div
          className={`upComingReserveDiv ${upComingReserveAni ? "animate" : ""}`}
        >
          <UpcomingReservations
            info={upComingReservations}
            setUpComingReserveAni={setUpComingReserveAni}
            activeRsvp={activeRsvp}
            setActiveRsvp={setActiveRsvp}
          />
        </div>
        <BookInfo
          info={bookingInfo}
          renderBookInfo={renderBookInfo}
          setRenderBookInfo={setRenderBookInfo}
          activeNav={activeNav}
          setBorderRed={setBorderRed}
          borderRed={borderRed}
          bookDate={bookDate}
          bookTime={bookTime}
          numName={numName}
          setNumName={setNumName}
          numEmail={numEmail}
          setNumEmail={setNumEmail}
          numPhone={numPhone}
          setNumPhone={setNumPhone}
          numNotes={numNotes}
          setNumNotes={setNumNotes}
        />
        <BookShowInfo
          activeRsvp={activeRsvp}
          setActiveRsvp={setActiveRsvp}
          activeNav={activeNav}
          upComingReservations={upComingReservations}
          elementsArray={elementsArray}
        />
      </>
    );
  } else {
    return (
      <>
        <div className={`homeReserveDiv ${animationActive ? "animate" : ""}`}>
          <h1>{lastActiveElementInfo.title}</h1>
        </div>
        <div
          className={`upComingReserveDiv ${upComingReserveAni ? "animate" : ""}`}
        >
          <UpcomingReservations
            info={upComingReservations}
            setUpComingReserveAni={setUpComingReserveAni}
            activeRsvp={activeRsvp}
            setActiveRsvp={setActiveRsvp}
          />
        </div>
        <BookInfo
          info={BookInfo}
          renderBookInfo={renderBookInfo}
          setRenderBookInfo={setRenderBookInfo}
          activeNav={activeNav}
          setBorderRed={setBorderRed}
          borderRed={borderRed}
          bookDate={bookDate}
          bookTime={bookTime}
          numName={numName}
          setNumName={setNumName}
          numEmail={numEmail}
          setNumEmail={setNumEmail}
          numPhone={numPhone}
          setNumPhone={setNumPhone}
          numNotes={numNotes}
          setNumNotes={setNumNotes}
        />
        <BookShowInfo
          activeRsvp={activeRsvp}
          setActiveRsvp={setActiveRsvp}
          activeNav={activeNav}
        />
      </>
    );
  }
};

const StatusDiv = ({ info, activeRsvp, setActiveRsvp, id }) => {
  return (
    <div className="homeReserveTimeSlotDivBox">
      {info.map((reservationItem, index) => (
        <TimeSlotDiv
          key={index}
          info={{
            startTime: reservationItem.startTime,
            endTime: reservationItem.endTime,
            color: "red",
            status: "busy",
            tableNum: 3,
            startDate: reservationItem.startDate,
            endDate: reservationItem.endDate,
            people: reservationItem.people,
            name: reservationItem.name,
            email: reservationItem.email,
            phone: reservationItem.phone,
            notes: reservationItem.notes,
            id: reservationItem.id,
            tableId: id,
          }}
          activeRsvp={activeRsvp}
          setActiveRsvp={setActiveRsvp}
        />
      ))}
    </div>
  );
};

const TimeSlotDiv = ({ info, activeRsvp, setActiveRsvp }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (
      activeRsvp.startTime === info.startTime &&
      activeRsvp.endTime === info.endTime &&
      activeRsvp.startDate === info.startDate &&
      activeRsvp.endDate === info.endDate &&
      activeRsvp.people === info.people &&
      activeRsvp.tableId === info.tableId &&
      activeRsvp.name === info.name &&
      activeRsvp.email === info.email &&
      activeRsvp.phone === info.phone &&
      activeRsvp.notes === info.notes
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [activeRsvp]);

  const handleClick = () => {
    setActiveRsvp(info);
  };

  return (
    <button
      onClick={handleClick}
      className={`timeSlotDiv ${active ? "selectedBorder" : ""} `}
    >
      <h4>
        {info.startTime} - {info.endTime}
      </h4>
      <h4>
        {info.startDate === info.endDate
          ? `Date: ${info.startDate.substring(info.startDate.length - 2)}`
          : `Date: ${info.startDate.substring(info.startDate.length - 2)}:${info.endDate.substring(info.endDate.length - 2)}`}
      </h4>
      <div>
        <div
          className="timeSlotDivCircle"
          style={{ backgroundColor: info.color }}
        />
        <h4> {info.status} </h4>
      </div>
    </button>
  );
};

const UpcomingReservations = ({
  info,
  setUpComingReserveAni,
  activeRsvp,
  setActiveRsvp,
}) => {
  return (
    <>
      <h4 id="upComingReserveTxt">Upcoming Reservations</h4>
      <div className="homeReserveLine" />
      <div className="upComingRervationDiv">
        {info.map((reservationItem, index) => (
          <TimeSlotDiv
            key={index}
            info={{
              startTime: reservationItem.startTime,
              endTime: reservationItem.endTime,
              color: "red",
              status: "busy",
              tableNum: 3,
              startDate: reservationItem.startDate,
              endDate: reservationItem.endDate,
              people: reservationItem.people,
              name: reservationItem.name,
              email: reservationItem.email,
              phone: reservationItem.phone,
              notes: reservationItem.notes,
              tableId: reservationItem.tableId,
              id: reservationItem.id,
            }}
            activeRsvp={activeRsvp}
            setActiveRsvp={setActiveRsvp}
          />
        ))}
      </div>
    </>
  );
};

export default HomeReserve;
