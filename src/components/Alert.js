import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../redux/alertRedux";

const Alert = () => {
  const alert = useSelector((state) => state.alert) || {};
  const { message, severity } = alert;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(updateAlert(null));
  };

  return (
    <Snackbar open={message} autoHideDuration={2000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
