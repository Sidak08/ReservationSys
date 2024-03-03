import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./components/homePage";
import Edit from "./components/edit";
import Draw from "./components/draw";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/draw" element={<Draw />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
