import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Link,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { logoutSuccess } from "../redux/EmployeeRedux.js";
import { postHospitalSuccess } from "../redux/hospitalRedux.js";
import { getCustomersSuccess } from "../redux/CustomerRedux.js";
import { getEmployeesSuccess } from "../redux/EmployeesRedux.js";
import { Menu, MenuItem } from "@mui/material";
import io from "socket.io-client";
import {
  addNotification,
  viewNotification,
} from "../redux/ChatNotificationRedux.js";

const breadCrumbMap = {
  "/customers": "Quản lý bệnh nhân",
  "/employees": "Quản lý nhân viên",
};
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="/">
        Trang chủ
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadCrumbMap[to]}
          </Typography>
        ) : (
          <Link color="inherit" to={to} key={to}>
            {breadCrumbMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export const NavBar = ({
  quantity,
  isOpen,
  setIsOpenSideBar,
  userChat,
  setUserChat,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notifications);
  const hospital = useSelector((state) => state.hospital?.hospital);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("https://hospital-backend-production-d055.up.railway.app", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (data) => {
      const { message, user } = data;
      if (message && !checkPushNotification(message)) return;
      dispatch(addNotification(user));
    });
  }, [socket]);

  const checkPushNotification = (message) => {
    const { hospitalId, sender, customerId } = message;

    if (
      hospitalId == user.currentUser.hospitalId &&
      sender == "user" &&
      customerId != userChat?._id
    )
      return true;
    return false;
  };

  const handleViewChat = (user) => {
    dispatch(viewNotification(user));
    setUserChat(user);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          className="left-navbar"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              setIsOpenSideBar(!isOpen);
            }}
            aria-label="menu-icon"
            color="primary"
          >
            <MenuIcon />
          </IconButton>

          <BreadCrumb />
        </Box>
        <Box
          className="right-navbar"
          sx={{
            display: "flex",
            width: "200px",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(logoutSuccess());
              dispatch(postHospitalSuccess(null));
              dispatch(getCustomersSuccess([]));
              dispatch(getEmployeesSuccess([]));
            }}
          >
            Đăng xuất
          </span>
          <Badge
            onClick={() => setIsOpenNotification(true)}
            badgeContent={notifications.length ? notifications.length : null}
            color="primary"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <NotificationsIcon
              color="primary"
              onClick={() => setIsOpenNotification(true)}
              id="notification-anchor" // Thêm id "notification-anchor" vào đây
            />
          </Badge>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src={user.currentUser.img || ""}></Avatar>
          </StyledBadge>
        </Box>
        <Menu
          open={isOpenNotification}
          onClose={() => setIsOpenNotification(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          getContentAnchorEl={null} 
          anchorReference="anchorEl"
          anchorEl={document.getElementById("notification-anchor")} 
        >
          {notifications.length ? (
            notifications.map((user) => (
              <MenuItem onClick={() => handleViewChat(user)}>
                Bạn có tin nhắn từ {user.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Không có thông báo</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
