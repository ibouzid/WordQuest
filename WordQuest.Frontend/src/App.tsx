import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Game from "./Pages/Game/Game";
import classes from './App.module.scss';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={classes.App}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default App;
