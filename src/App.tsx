import {useState,useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import  ListStatistic  from './pages/ListStatistic';
import  Statistic  from './pages/Statistic';
import { SideBar } from './components/SideBar';
import { NavBar } from './components/NavBar';
import './scss/style.scss'
import { Status } from './pages/Status';
function App() {
  const [isWindow, setIsWindow] = useState(window.innerWidth > 1212);
  const [isOpenSideBar,setIsOpenSideBar]=useState(isWindow);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsWindow(window.innerWidth > 1212);
      setIsOpenSideBar(window.innerWidth > 1212)
    });
    return window.addEventListener("resize", () => {
      setIsWindow(window.innerWidth > 1212);
      setIsOpenSideBar(window.innerWidth > 1212)
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
      <SideBar isOpen={isOpenSideBar}/>
      <div className="page">
      <NavBar quantity={1} isOpen={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} isWindow={isWindow}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/status" element={<Status/>}/>

        <Route path="/statistic" element={<ListStatistic/>}/>
        <Route path="/statistic/:id" element={<Statistic/>}/> 
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
