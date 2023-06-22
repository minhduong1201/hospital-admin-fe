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
import { CustomerPopOver } from "./components/CustomerPopOver";
function App() {
  const [isWindow, setIsWindow] = useState(window.innerWidth > 1212);
  const [isOpenSideBar, setIsOpenSideBar] = useState(isWindow);
  const [selectedUser, setSelectedUser] = useState(null);

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

  return (
    <div className="App">
      <BrowserRouter>
        {currentuser ? (
          <>
            <SideBar isOpen={isOpenSideBar} />
            <div className="page">
              <NavBar
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                quantity={1}
                isOpen={isOpenSideBar}
                setIsOpenSideBar={setIsOpenSideBar}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/customers"
                  element={
                    <Customers
                      selectedUser={selectedUser}
                      setSelectedUser={setSelectedUser}
                    />
                  }
                />
                <Route path="/employees" element={<Employees />} />
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
        {selectedUser && (
          <CustomerPopOver
            selectedUser={selectedUser}
            isOpenPopOver={selectedUser}
            setIsOpenPopOver={setSelectedUser}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;