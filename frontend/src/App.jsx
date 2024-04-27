import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Draw from "./components/draw";
import Setting from "./components/setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashbored" element={<Draw />} />
        <Route path="setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
