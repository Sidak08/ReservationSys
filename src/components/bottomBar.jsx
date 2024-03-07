import "./bottomBar.css";
const BottomBar = () => {
  return (
    <div className="bottomBar">
      <div className="iconBox">
        <div className="circle" id="green"></div>
        <h4> Empty </h4>
      </div>

      <div className="iconBox">
        <div className="circle" id="brown"></div>
        <h4> Dirty </h4>
      </div>

      <div className="iconBox">
        <div className="circle" id="red"></div>
        <h4> In Use </h4>
      </div>

      <div className="iconBox">
        <div className="circle" id="purple"></div>
        <h4> Unavailable </h4>
      </div>

      <div className="iconBox">
        <div className="circle" id="yellow"></div>
        <h4> Reserved </h4>
      </div>
    </div>
  );
};

export default BottomBar;
