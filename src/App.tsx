import { useState, useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ListStatistic from "./pages/ListStatistic";
import Statistic from "./pages/Statistic";
import { SideBar } from "./components/SideBar";
import { NavBar } from "./components/NavBar";
import "./scss/style.scss";
import { Status } from "./pages/Status";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
function App() {
  const [isWindow, setIsWindow] = useState(window.innerWidth > 1212);
  const [isOpenSideBar, setIsOpenSideBar] = useState(isWindow);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsWindow(window.innerWidth > 1212);
      setIsOpenSideBar(window.innerWidth > 1212);
    });
    return window.addEventListener("resize", () => {
      setIsWindow(window.innerWidth > 1212);
      setIsOpenSideBar(window.innerWidth > 1212);
    });
  }, []);
  const currentuser=useSelector((state:any) => state.user.currentUser);
  const isAdmin = currentuser?.isAdmin || false
  return (
    <div className="App">
      <BrowserRouter>
          {isAdmin?
            <>
            <SideBar isOpen={isOpenSideBar} />
            <div className="page">
              <NavBar
                quantity={1}
                isOpen={isOpenSideBar}
                setIsOpenSideBar={setIsOpenSideBar}
                isWindow={isWindow}
              />
              <Routes>
                <Route path="/" element={isAdmin?<Home />:<Navigate to="/login" />} />
                <Route path="/status" element={<Status />} />
                <Route path="/statistic" element={<ListStatistic />} />
                <Route path="/statistic/:id" element={<Statistic />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/register" element={<Navigate to="/" />} />
              </Routes>
            </div>
            </>:
             <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/status" element={<Navigate to="/login" />} />
              <Route path="/statistic" element={<Navigate to="/login" />} />
              <Route path="/statistic/:id" element={<Navigate to="/login" />} />
             </Routes>
          }
      </BrowserRouter>
    </div>
  );
}

export default App;
