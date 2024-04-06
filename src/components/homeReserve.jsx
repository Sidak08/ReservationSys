import "./homeReserve.css";
import { useEffect, useState } from "react";

const HomeReserve = ({
  activeElement,
  activeNav,
  elementsArray,
  upComingReservation,
  setElementsArray,
}) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [lastActiveElement, setLastActiveElement] = useState(false);
  const [lastActiveElementInfo, setLastActiveElementInfo] = useState({
    title: "",
  });
  const [forceRerender, setForceRerender] = useState(1);
  const bookLength = 120;

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

  if (
    lastActiveElement !== false &&
    activeNav === "home" &&
    activeElement !== false
  ) {
    return (
      <div className={`homeReserveDiv ${animationActive ? "animate" : ""}`}>
        <h1>{elementsArray[lastActiveElement].title}</h1>
        <div id="homeReserveStatusDiv">
          <h4>Status</h4>
          <div className="homeReserveLine" />
          <StatusDiv info={elementsArray[lastActiveElement]} />
        </div>
        <BookSpot
          activeElement={activeElement}
          elementsArray={elementsArray}
          upComingReservation={upComingReservation}
          setElementsArray={setElementsArray}
          forceRerender={forceRerender}
          setForceRerender={setForceRerender}
          bookLength={bookLength}
        />
      </div>
    );
  } else {
    return (
      <div className={`homeReserveDiv ${animationActive ? "animate" : ""}`}>
        <h1>{lastActiveElementInfo.title}</h1>
      </div>
    );
  }
};

const StatusDiv = ({ info }) => {
  for (let i = 0; i < info.reservation.lenght; i++) {}
  return (
    <div id="homeReserveTimeSlotDivBox">
      {info.reservation.map((reservationItem, index) => (
        <TimeSlotDiv
          key={index}
          info={{
            startTime: reservationItem.startTime,
            endTime: reservationItem.endTime,
            color: "red",
            status: "busy",
            tableNum: 3,
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
      <h4> Table: {info.tableNum} </h4>
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
  upComingReservation,
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

  const checkAvailability = (bookTime, bookDate, bookEndTime) => {
    bookTime =
      parseInt(bookTime.split(":")[0]) * 60 + parseInt(bookTime.split(":")[1]);

    // const bookEndTime = bookTime + bookLength;
    for (let i = 0; i < elementsArray[activeElement].reservation.length; i++) {
      const element = elementsArray[activeElement].reservation[i];

      const elementStartTime = parseInt(
        parseInt(element.startTime.split(":")[0] * 60) +
          parseInt(element.startTime.split(":")[1]),
      );

      const elementEndTime = parseInt(
        parseInt(element.endTime.split(":")[0]) * 60 +
          parseInt(element.endTime.split(":")[1]),
      );

      if (bookDate === element.startDate) {
        if (
          (bookTime >= elementStartTime && bookTime < elementEndTime) ||
          (bookEndTime > elementStartTime && bookEndTime <= elementEndTime) ||
          (bookTime < elementStartTime && bookEndTime > elementEndTime)
        ) {
          return false;
        }
      }
    }

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
    if (
      checkAvailability(
        bookTime,
        bookDate,
        parseInt(bookTime.split(":")[0]) * 60 +
          parseInt(bookTime.split(":")[1]) +
          bookLength,
      )
    ) {
      setSpotAvailble(true);
    } else {
      setSpotAvailble(false);
    }
  }, [bookDate, bookTime]);

  // useEffect(() => {
  //   if (elementsArray[activeElement].reservation.length > 1) {
  //     const activeReservation = elementsArray[activeElement].reservation;
  //     const lastReservationIndex = activeReservation.length - 1;
  //     const lastReservation = activeReservation[lastReservationIndex];
  //     const lastReservationStartTime =
  //       parseInt(lastReservation.startTime.split(":")[0]) * 60 +
  //       parseInt(lastReservation.startTime.split(":")[1]);

  //     for (let i = 0; i < lastReservationIndex; i++) {
  //       const currentReservationStartTime =
  //         parseInt(activeReservation[i].startTime.split(":")[0]) * 60 +
  //         parseInt(activeReservation[i].startTime.split(":")[1]);

  //       if (lastReservationStartTime <= currentReservationStartTime) {
  //         setForceRerender(forceRerender + 1);
  //         // Insert the last reservation at the correct position
  //         activeReservation.splice(i, 0, lastReservation);
  //         // Remove the duplicate last reservation
  //         activeReservation.splice(lastReservationIndex + 1, 1);
  //         break; // Exit the loop after inserting the reservation
  //       }
  //     }

  //     elementsArray[activeElement].reservation = activeReservation;
  //   }
  // }, [elementsArray, activeElement, forceRerender]);

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
          break; // Exit the loop after inserting the reservation
          elementsArray[activeElement].reservation = activeReservation;
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
    if (
      checkAvailability(
        bookTime,
        bookDate,
        parseInt(bookTime.split(":")[0]) * 60 +
          parseInt(bookTime.split(":")[1]) +
          bookLength,
      )
    ) {
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

export default HomeReserve;
