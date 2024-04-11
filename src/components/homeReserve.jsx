import "./homeReserve.css";
import { useEffect, useState } from "react";
import BookInfo from "./homeReserveBookInfo";
import BookSpot from "./homeReserveBookSpot";

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
  });
  const [renderBookInfo, setRenderBookInfo] = useState(false);
  const [borderRed, setBorderRed] = useState(false);

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
            <StatusDiv info={elementsArray[lastActiveElement].reservation} />
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
          />
        </div>
        <div
          className={`upComingReserveDiv ${upComingReserveAni ? "animate" : ""}`}
        >
          <UpcomingReservations
            info={upComingReservations}
            setUpComingReserveAni={setUpComingReserveAni}
          />
        </div>
        <BookInfo
          info={BookInfo}
          renderBookInfo={renderBookInfo}
          setRenderBookInfo={setRenderBookInfo}
          activeNav={activeNav}
          setBorderRed={setBorderRed}
          borderRed={borderRed}
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
          />
        </div>
        <BookInfo
          info={BookInfo}
          renderBookInfo={renderBookInfo}
          setRenderBookInfo={setRenderBookInfo}
          activeNav={activeNav}
          setBorderRed={setBorderRed}
          borderRed={borderRed}
        />
      </>
    );
  }
};

const StatusDiv = ({ info }) => {
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
          }}
        />
      ))}
    </div>
  );
};

const TimeSlotDiv = ({ info }) => {
  return (
    <button className="timeSlotDiv">
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

const UpcomingReservations = ({ info, setUpComingReserveAni }) => {
  if (info.length < 1) {
    // setUpComingReserveAni(false);
  }
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
            }}
          />
        ))}
      </div>
    </>
  );
};

export default HomeReserve;
