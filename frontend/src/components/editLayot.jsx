import "./editLayot.css";
import React, { useState } from "react";
import {
  RoundTable,
  ReactTable,
  SqaureTable,
  Chair,
  HighChair,
  Sofa,
} from "./svg";

const EditLayout = ({ active, selectedElement, setSelectedElement }) => {
  if (active === "edit") {
    return (
      <div id="editLayoutDiv">
        <h1 id="title">Edit Layout</h1>
        <div>
          <TablesDiv
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            otherInfo={{}}
          />
          <SeatsDiv
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            otherInfo={{}}
          />
        </div>
      </div>
    );
  } else return;
};

const TablesDiv = ({ selectedElement, setSelectedElement, otherInfo }) => {
  return (
    <div>
      <div id="TablesDivTitle">
        <h1> Tables </h1>
        <div className="whiteLine" />
      </div>
      <ObjectButon
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        info={{
          title: "Round Table",
          seats: "Unlimeted Seats",
          svg: <RoundTable />,
        }}
      />
      <ObjectButon
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        info={{
          title: "Square Table",
          seats: "Unlimeted Seats",
          svg: <SqaureTable />,
        }}
      />
      <ObjectButon
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        info={{
          title: "Rectangle Table",
          seats: "Unlimeted Seats",
          svg: <ReactTable />,
        }}
      />
    </div>
  );
};

const SeatsDiv = ({ selectedElement, setSelectedElement, otherInfo }) => {
  return (
    <div>
      <div id="TablesDivTitle">
        <h1> Seats </h1>
        <div className="whiteLine" />
      </div>
      <ObjectButon
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        info={{
          title: "Chair",
          seats: "1 Seat",
          svg: <Chair />,
        }}
      />
      <ObjectButon
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        info={{
          title: "High Chair",
          seats: "1 Seat",
          svg: <HighChair />,
        }}
      />
      <ObjectButon
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        info={{
          title: "Sofa",
          seats: "Unlimeted Seats",
          svg: <Sofa />,
        }}
      />
    </div>
  );
};

const ObjectButon = ({ selectedElement, setSelectedElement, info }) => {
  return (
    <button
      className={`objectButton ${selectedElement === info.title ? "active" : ""}`}
      onClick={() => {
        setSelectedElement(info.title);
      }}
    >
      <div className="objectButtonMainBox">
        <div>
          <h2>{info.title}</h2>
          <h4>{info.seats}</h4>
        </div>
        {info.svg}
      </div>
      <div className="darkLine" />
    </button>
  );
};

export default EditLayout;
