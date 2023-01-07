import React from "react";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { Link } from "react-router-dom";
type ISideBarProps = {
  isOpen: boolean;
};
export const SideBar = ({ isOpen }: ISideBarProps) => {
  return (
        <div className="sidebar" id="sidebar" style={isOpen?{minWidth:'250px',maxWidth:'250px',width:'auto'}:{maxWidth:'0',minWidth:'0',width:0,opacity:'0'}}>
          <div className="sidebar-header">PHẦN MỀM QUẢN LÝ RÁC THẢI</div>
          <div className="sidebar-content">
            <div className="sidebar-title">ĐỔ RÁC</div>
            <ul className="list-item">
                <li className="sidebar-item">
              <Link to="/status">
                  <AutoDeleteIcon />
                  <div className="item-content">Xem lượng rác</div>
              </Link>
                </li>
            </ul>
            <div className="sidebar-title">THỐNG KÊ</div>
            <ul className="list-item">
                <li className="sidebar-item">
              <Link to="/statistic">
                  <SignalCellularAltIcon />
                  <div className="item-content">Xem thống kê</div>
              </Link>
                </li>
            </ul>
          </div>
        </div>
    

  );
};
