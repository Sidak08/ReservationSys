import "./homeReserve.css";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setAnimationActive(
      activeElement !== false &&
        activeNav === "home" &&
        elementsArray.length > 0,
    );
  }, [activeElement, activeNav]);

  useEffect(() => {
    if (activeElement !== false) {
      setLastActiveElement(activeElement);
      setLastActiveElementInfo(elementsArray[activeElement]);
    }
  }, [activeElement, activeNav]);

  useEffect(() => {
    setUpComingReserveAni(activeNav === "home");
  }, [activeElement, activeNav]);

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
          />
        </div>
        <div
          className={`upComingReserveDiv ${upComingReserveAni ? "animate" : ""}`}
        >
          <h4 id="upComingReserveTxt">Upcoming Reservations</h4>
          <div className="homeReserveLine" />
          <UpcomingReservations info={upComingReservations} />
        </div>
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
          <h4 id="upComingReserveTxt">Upcoming Reservations</h4>
          <div className="homeReserveLine" />
          <UpcomingReservations info={upComingReservations} />
        </div>
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
    <div className="timeSlotDiv">
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
    </div>
  );
};

const BookSpot = ({
  activeElement,
  elementsArray,
  setElementsArray,
  upComingReservations,
  forceRerender,
  setForceRerender,
  bookLength,
}) => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const time = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;

  const [bookDate, setBookDate] = useState(`${year}-${month}-${day}`);
  const [bookTime, setBookTime] = useState(time);
  const [spotAvailabe, setSpotAvailble] = useState(false);

  // const checkAvailability = (bookTime, bookDate, bookEndTime, bookEndDate) => {
  //   console.log(elementsArray[activeElement].reservation);
  //   bookTime =
  //     parseInt(bookTime.split(":")[0]) * 60 + parseInt(bookTime.split(":")[1]);
  //   bookEndTime =
  //     parseInt(bookEndTime.split(":")[0]) * 60 +
  //     parseInt(bookEndTime.split(":")[1]);

  //   for (let i = 0; i < elementsArray[activeElement].reservation.length; i++) {
  //     const element = elementsArray[activeElement].reservation[i];

  //     const elementStartTime =
  //       parseInt(element.startTime.split(":")[0]) * 60 +
  //       parseInt(element.startTime.split(":")[1]);
  //     const elementEndTime =
  //       parseInt(element.endTime.split(":")[0]) * 60 +
  //       parseInt(element.endTime.split(":")[1]);

  //     if (element.startDate !== element.endDate) {
  //       if (bookDate === element.startDate) {
  //         if (
  //           (bookTime >= elementStartTime && bookTime < elementEndTime) ||
  //           (bookEndTime > elementStartTime && bookEndTime <= elementEndTime) ||
  //           (bookTime < elementStartTime && bookEndTime > elementEndTime)
  //         ) {
  //           return false;
  //         }
  //       }
  //       if (bookDate === element.endDate) {
  //       }
  //     }

  //     if (bookDate === element.startDate) {
  //       if (
  //         (bookTime >= elementStartTime && bookTime < elementEndTime) ||
  //         (bookEndTime > elementStartTime && bookEndTime <= elementEndTime) ||
  //         (bookTime < elementStartTime && bookEndTime > elementEndTime)
  //       ) {
  //         return false;
  //       }
  //     }
  //   }

  //   return true;
  // };

  const changeDateIntoMinutes = (date) => {
    const year = parseInt(date.split("-")[0] * 365 * 24 * 60);
    const month = parseInt(date.split("-")[1] * 30 * 24 * 60);
    const day = parseInt(date.split("-")[2] * 24 * 60);
    console.log(year, month, day);
    return year + month + day;
  };

  const checkAvailability = (bookTime, bookDate, bookEndTime, bookEndDate) => {
    bookTime =
      parseInt(bookTime.split(":")[0]) * 60 +
      parseInt(bookTime.split(":")[1]) +
      changeDateIntoMinutes(bookDate);
    bookEndTime =
      parseInt(bookEndTime.split(":")[0]) * 60 +
      parseInt(bookEndTime.split(":")[1]) +
      changeDateIntoMinutes(bookEndDate);

    for (let i = 0; i < elementsArray[activeElement].reservation.length; i++) {
      const element = elementsArray[activeElement].reservation[i];

      const elementStartTime =
        parseInt(element.startTime.split(":")[0]) * 60 +
        parseInt(element.startTime.split(":")[1]) +
        changeDateIntoMinutes(element.startDate);
      const elementEndTime =
        parseInt(element.endTime.split(":")[0]) * 60 +
        parseInt(element.endTime.split(":")[1]) +
        changeDateIntoMinutes(element.endDate);

      console.log(bookTime, bookEndTime, elementStartTime, elementEndTime);
      if (
        (bookTime >= elementStartTime && bookTime <= elementEndTime) ||
        (bookEndTime >= elementStartTime && bookEndTime <= elementEndTime)
      ) {
        return false;
      }
    }
    //0952 1072 1572 1692
    // 1064001572

    return true;
  };

  const calculateEndTime = (startTime, startDate, stayLength) => {
    startTime =
      parseInt(startTime.split(":")[0]) * 60 +
      parseInt(startTime.split(":")[1]);

    const totalMinutes = startTime + stayLength;

    if (totalMinutes <= 1440) {
      const hour = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
      const minute = String(totalMinutes % 60).padStart(2, "0");
      return { endTime: `${hour}:${minute}`, endDate: startDate };
    } else {
      const excessMinutes = totalMinutes - 1440;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      const hour = String(Math.floor(excessMinutes / 60)).padStart(2, "0");
      const minute = String(excessMinutes % 60).padStart(2, "0");
      return {
        endTime: `${hour}:${minute}`,
        endDate: String(endDate.toISOString().slice(0, 10)),
      };
    }
  };

  useEffect(() => {
    const { endTime, endDate } = calculateEndTime(
      bookTime,
      bookDate,
      bookLength,
    );
    if (checkAvailability(bookTime, bookDate, endTime, endDate)) {
      setSpotAvailble(true);
    } else {
      setSpotAvailble(false);
    }
  }, [bookDate, bookTime]);

  useEffect(() => {
    if (elementsArray[activeElement].reservation.length > 1) {
      const activeReservation = elementsArray[activeElement].reservation;
      const lastReservationIndex = activeReservation.length - 1;
      const lastReservation = activeReservation[lastReservationIndex];
      const lastReservationStartTime =
        parseInt(lastReservation.startTime.split(":")[0]) * 60 +
        parseInt(lastReservation.startTime.split(":")[1]);
      const lastReservationStartDate = new Date(lastReservation.startDate);

      for (let i = 0; i < lastReservationIndex; i++) {
        const currentReservationStartTime =
          parseInt(activeReservation[i].startTime.split(":")[0]) * 60 +
          parseInt(activeReservation[i].startTime.split(":")[1]);
        const currentReservationStartDate = new Date(
          activeReservation[i].startDate,
        );

        if (
          lastReservationStartDate <= currentReservationStartDate &&
          lastReservationStartTime <= currentReservationStartTime
        ) {
          // Insert the last reservation at the correct position
          activeReservation.splice(i, 0, lastReservation);
          // Remove the duplicate last reservation
          activeReservation.splice(lastReservationIndex + 1, 1);
          // Trigger re-render by toggling the forceRerender state
          setForceRerender((prev) => !prev);
          elementsArray[activeElement].reservation = activeReservation;
          break; // Exit the loop after inserting the reservation
        }
      }
    }
    if (upComingReservations.length > 1) {
      const activeReservation = upComingReservations;
      const lastReservationIndex = activeReservation.length - 1;
      const lastReservation = activeReservation[lastReservationIndex];
      const lastReservationStartTime =
        parseInt(lastReservation.startTime.split(":")[0]) * 60 +
        parseInt(lastReservation.startTime.split(":")[1]);
      const lastReservationStartDate = new Date(lastReservation.startDate);

      for (let i = 0; i < lastReservationIndex; i++) {
        const currentReservationStartTime =
          parseInt(activeReservation[i].startTime.split(":")[0]) * 60 +
          parseInt(activeReservation[i].startTime.split(":")[1]);
        const currentReservationStartDate = new Date(
          activeReservation[i].startDate,
        );

        if (
          lastReservationStartDate <= currentReservationStartDate &&
          lastReservationStartTime <= currentReservationStartTime
        ) {
          // Insert the last reservation at the correct position
          activeReservation.splice(i, 0, lastReservation);
          // Remove the duplicate last reservation
          activeReservation.splice(lastReservationIndex + 1, 1);
          // Trigger re-render by toggling the forceRerender state
          setForceRerender((prev) => !prev);
          upComingReservations = activeReservation;
          break; // Exit the loop after inserting the reservation
        }
      }
    }
  }, [elementsArray, activeElement, forceRerender]);

  const handleDateChange = (event) => {
    setBookDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setBookTime(event.target.value);
  };

  const handleSubmit = () => {
    setForceRerender(forceRerender + 1);
    const { endTime, endDate } = calculateEndTime(
      bookTime,
      bookDate,
      bookLength,
    );
    if (checkAvailability(bookTime, bookDate, endTime, endDate)) {
      const { endTime, endDate } = calculateEndTime(
        bookTime,
        bookDate,
        bookLength,
      );
      elementsArray[activeElement].reservation.push({
        name: "anon",
        number: "876 887 7777",
        startTime: bookTime,
        endTime: endTime,
        startDate: bookDate,
        endDate: endDate,
        people: 7,
        email: "spam@gmail.com",
      });
      upComingReservations.push({
        name: "anon",
        number: "876 887 7777",
        startTime: bookTime,
        endTime: endTime,
        startDate: bookDate,
        endDate: endDate,
        people: 7,
        email: "spam@gmail.com",
      });
      setSpotAvailble(false);
    }
  };

  return (
    <div id="bookSpotDiv">
      <h1>Book spot</h1>
      <div className="homeReserveLine" />
      <div id="bookSpotTimeSlotDiv">
        <input
          type="date"
          id="bookSpotDivDate"
          onChange={handleDateChange}
          value={bookDate}
        />
        <input
          type="time"
          id="bookSpotDivTime"
          onChange={handleTimeChange}
          value={bookTime}
        />
        <div id="avalibility" className={spotAvailabe ? "green" : "red"} />
      </div>
      <button
        id="bookSpotSubmitBtn"
        onClick={() => {
          handleSubmit();
        }}
      >
        <h4>Book</h4>
      </button>
    </div>
  );
};

const UpcomingReservations = ({ info }) => {
  return (
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
  );
};

export default HomeReserve;
