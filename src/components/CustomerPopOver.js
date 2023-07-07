import {
  Popover,
  Box,
  Typography,
  FormControl,
  TextField,
  Tabs,
  Tab,
  Grid,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { HeartRateChart } from "./HeartRateChart";
import { userRequest } from "../requestMethod";
import { updateCustomers } from "../redux/CustomerRedux";
import { alertError, alertSuccess } from "../utils/tools";

export const CustomerPopOver = ({
  isOpenPopOver,
  setIsOpenPopOver,
  selectedUser,
  isEmployee,
  accessToken
}) => {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(selectedUser);
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(selectedUser);
  }, [selectedUser]); 
  const { name, address, phone, img, age, heart_rate, last_update } = user;

  const handleSubmit = async () => {
    await userRequest(accessToken).put(`/customers/${user._id}`, user).then((res) => {
      if (res && 199 < res.status < 300) {
        dispatch(updateCustomers([res.data]));
        alertSuccess(dispatch, "Cập nhật thành công!")
      }
      else {
        alertError(dispatch, "Thất bại")
      }
      setIsOpenPopOver(null);
    });
  };

  return (
    <Popover
      onClose={() => {
        setIsOpenPopOver(null);
      }}
      width={1000}
      open={isOpenPopOver}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 50, left: 450 }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box
        sx={{ width: "950px", marginRight: "50px", marginBottom: "30px" }}
        className="form"
      >
        <Typography
          color="primary"
          sx={{ textAlign: "center", fontWeight: "700", lineHeight: "50px" }}
        >
          Thông tin chi tiết
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={(e, value) => {
              setTab(value);
            }}
            aria-label="basic tabs example"
          >
            {isEmployee ? (
              <Tab label="Thông tin nhân viên" />
            ) : (
              <Tab label="Thông tin bệnh nhân" />
            )}
            {isEmployee ? <></> : <Tab label="Dữ liệu nhịp tim trong ngày" />}
          </Tabs>
        </Box>
        {tab == 0 && (
          <FormControl fullWidth sx={{ m: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar alt={name} src={img} />
                </Grid>
                <Grid
                  item
                  width={400}
                  style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                >
                  <Typography variant="h6">{name}</Typography>
                  <Typography variant="body1">Địa chỉ: {address}</Typography>
                  <Typography variant="body1">
                    Số điện thoại: {phone}
                  </Typography>
                  <Typography variant="body1">Tuổi: {age}</Typography>
                  <Typography variant="body1">
                    Nhịp tim: {heart_rate || "Chưa có dữ liệu"}
                  </Typography>
                  <Typography variant="body1" style={{ whiteSpace: "normal" }}>
                    Lần cập nhật cuối: {last_update || "Chưa có dữ liệu"}
                  </Typography>
                </Grid>
              </Grid>
              <div style={{ width: "100%" }}>
                <div className="label-input">Tình trạng sức khỏe:</div>
                <TextField
                  multiline
                  rows={4}
                  style={{ width: "100%" }}
                  id="health"
                  onChange={(e) => setUser({ ...user, health: e.target.value })}
                  value={user?.health}
                />
              </div>
            </div>
          </FormControl>
        )}
        {tab == 1 && <HeartRateChart accessToken={accessToken} user={selectedUser} />}
        <Box
          sx={{
            marginTop: "20px !important",
            width: "50%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            position: "relativex",
          }}
        >
          <Button
            sx={{ width: "100px" }}
            color="error"
            variant="contained"
            onClick={() => setIsOpenPopOver(null)}
          >
            Cancel
          </Button>
          <Button
            sx={{ width: "100px" }}
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};
