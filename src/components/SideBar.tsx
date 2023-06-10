import React from "react";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { Link } from "react-router-dom";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Diversity3Icon from '@mui/icons-material/Diversity3';
type ISideBarProps = {
  isOpen: boolean;
};
export const SideBar = ({ isOpen }: ISideBarProps) => {
  return (
    <div
      className="sidebar"
      id="sidebar"
      style={
        isOpen
          ? { minWidth: "250px", maxWidth: "250px", width: "auto" }
          : { maxWidth: "0", minWidth: "0", width: 0, opacity: "0" }
      }
    >
      <div className="sidebar-header">HỆ THỐNG GIÁM SÁT VÀ TƯ VẤN SỨC KHỎE</div>
      <div className="sidebar-content" style={{ marginTop: 10 }}>
        <div className="sidebar-title">
          <Link to="/customers" style={{color: "white", textDecoration: "none", lineHeight: "50px"}}>
            <HealthAndSafetyIcon />
            <span className="item-content">QUẢN LÝ BỆNH NHÂN</span>
          </Link>
        </div>
        <div className="sidebar-title">
          <Link to="/employees" style={{color: "white", textDecoration: "none", lineHeight: "50px"}}>
            <Diversity3Icon />
            <span className="item-content">QUẢN LÝ NHÂN VIÊN</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
