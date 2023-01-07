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
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/material";
const breadCrumbMap: { [key: string]: string } = {
  "/statistic": "Thống kê",
  "/status": "Xem lượng rác",
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
  isWindow
}: {
  quantity: number;
  isOpen: boolean;
  setIsOpenSideBar: Dispatch<SetStateAction<boolean>>;
  isWindow:boolean
}) => {
  const user = useSelector((state: any) => state.user);
  console.log(user.currentUser.avatar);
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
          {!isWindow ? (
            <IconButton
              onClick={() => {
                setIsOpenSideBar(!isOpen);
              }}
              aria-label="menu-icon"
              color="primary"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <BreadCrumb />
        </Box>
        <Box
          className="right-navbar"
          sx={{
            display: "flex",
            width: "100px",
            justifyContent: "space-around",
          }}
        >
          <Badge
            badgeContent={quantity}
            color="primary"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <NotificationsIcon color="primary" />
          </Badge>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src={user.currentUser.avatar || ""}></Avatar>
          </StyledBadge>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
