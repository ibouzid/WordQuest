import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Game from "./Pages/Game/Game";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
