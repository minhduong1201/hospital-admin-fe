import { Box, Button, Input, Popover, Typography } from "@mui/material";
import { addNewCustomer, addNewEmployee } from "../redux/apiCalls";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const AddNewPopOver = (props) => {
    const {isOpenPopOver, setIsOpenPopOver, hospital, type} = props;
    const [addId, setAddId] = useState(null);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        if (!hospital || !addId) return;
        if(type == "employee")
        addNewEmployee({ hospitalId: hospital._id }, dispatch, addId);
        addNewCustomer({ hospitalId: hospital._id }, dispatch, addId);
      };

    return <Popover
    onClose={() => {
      setIsOpenPopOver(false);
    }}
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
      sx={{ width: "600px", marginRight: "50px", marginBottom: "30px" }}
      className="form"
    >
      <Typography
        color="primary"
        sx={{ textAlign: "center", fontWeight: "700", lineHeight: "50px" }}
      >
        Thêm {type=="employee"? "nhân viên": "bệnh nhân"}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
      <Box>
        <div
          style={{
            display: "flex",
            height: 50,
            alignItems: "baseline",
            margin: "20px 0 0 120px",
          }}
        >
          <span>Mã người dùng:</span>
          <Input onChange={(e) => setAddId(e.target.value)}></Input>
        </div>
      </Box>
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
          onClick={() => setIsOpenPopOver(false)}
        >
          Cancel
        </Button>
        <Button
          sx={{ width: "100px" }}
          onClick={() => {
            handleSubmit();
            setIsOpenPopOver(false);
          }}
          color="primary"
          variant="contained"
        >
          OK
        </Button>
      </Box>
    </Box>
  </Popover>
}