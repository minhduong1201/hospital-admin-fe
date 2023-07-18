import { useState, useEffect } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { SideBar } from "./components/SideBar";
import { NavBar } from "./components/NavBar";
import "./scss/style.scss";
import { Customers } from "./pages/Customers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Employees } from "./pages/Employees";
import { useSelector } from "react-redux";
import Chat from "./components/Chat";
import Alert from "./components/Alert";
function App() {
  const [isWindow, setIsWindow] = useState(window.innerWidth > 1212);
  const [isOpenSideBar, setIsOpenSideBar] = useState(isWindow);
  const [userChat, setUserChat] = useState(null);

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
  const currentuser = useSelector((state) => state.user.currentUser);
  const hospital = useSelector((state) => state.hospital.hospital);
  const accessToken = currentuser?.accessToken;
  return (
    <div className="App">
      <BrowserRouter>
        {currentuser ? (
          <>
            <SideBar accessToken={accessToken} isOpen={isOpenSideBar} />
            <div className="page">
              <NavBar
                accessToken={accessToken}
                userChat={userChat}
                setUserChat={setUserChat}
                quantity={1}
                isOpen={isOpenSideBar}
                setIsOpenSideBar={setIsOpenSideBar}
              />
              <Routes>
                <Route path="/" element={<Home accessToken={accessToken}/>} />
                <Route
                  path="/customers"
                  element={
                    <Customers accessToken={accessToken} userChat={userChat} setUserChat={setUserChat} />
                  }
                />
                <Route path="/employees" element={<Employees accessToken={accessToken}/>} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/register" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customers" element={<Navigate to="/login" />} />
            <Route path="/employees" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customers" element={<Navigate to="/login" />} />
          </Routes>
        )}
        {userChat && (
          <Chat
            hospital={hospital}
            user={userChat}
            visible={userChat}
            onClose={() => setUserChat(null)}
          />
        )}
        <Alert />
      </BrowserRouter>
    </div>
  );
}

export default App;
