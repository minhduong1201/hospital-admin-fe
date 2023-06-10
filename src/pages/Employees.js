import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteIcon from "@mui/icons-material/Delete";
import { Input, Popover, Typography } from "@mui/material";
import axios from "axios";
import { getEmployees } from "../redux/apiCalls";
const arr = [
  "https://image.vtc.vn/files/thutla/2019/04/22/101925-dai-hoc-kinh-te-quoc-dan-1-1140223.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6ydRIrVChYDi6wHIWcpTM_tpYxvG3COj9w&usqp=CAU",
  "https://betongnhuaasphalt.com/wp-content/uploads/2021/05/tham-duong-khu-noi-bo-dieu-tri-cong-nghe-cao-bach-mai-e1622107355209.jpg",
  "http://hanoimoi.com.vn/Uploads/images/phananh/2021/02/06/hanoi1.jpg",
  "https://newsmd2fr.keeng.net/tiin/archive/images/20211128/112050_a.jpg",
  "https://mapio.net/images-p/35546530.jpg",
];
const a = Math.random();

export const Employees = () => {
  const index = Math.round(Math.random() * 5);
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const [isEdit, setIsEdit] = useState({ id: 0, address: "", name: "" });
  const dispatch = useDispatch();
  const hospital = useSelector((state) => state.hospital.hospital);
  const employees = useSelector((state) => state.employees);
  useEffect(() => {
    getEmployees(hospital._id, dispatch);
  }, []);

  const windowColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Tên",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    // {
    //   field: "img",
    //   headerName: "Ảnh",
    //   width: 100,
    //   renderCell: (params) => {
    //     return <div className="productListItem">{params.row.img}</div>;
    //   },
    // },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.email}</div>;
      },
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.phone}</div>;
      },
    },
    {
      field: "age",
      headerName: "Tuổi",
      width: 100,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.age}</div>;
      },
    },
    {
      field: "role",
      headerName: "Vai trò",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.role}</div>;
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button
              className="edit"
              onClick={() => {
                setIsOpenPopOver(true);
                setIsEdit({
                  id: params.row._id,
                  address: params.row.address,
                  name: params.row.name,
                });
              }}
            >
              Xem chi tiết
            </button>
            <IconButton className="delete">
              <DeleteIcon
                color="primary"
                className=""
                onClick={() => handleDelete(params.row._id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    alert("Xóa thành công!");
  };
  const handleSubmit = (name, address, long, lat) => {
    alert("Vui lòng nhập đủ giá trị");
  };
  const handleSubmitEdit = (name, address, long, lat, id) => {
    if (name && address && id) {
      // updateBin({ name, address, long, lat, id }, dispatch);
    } else alert("Vui lòng nhập đủ giá trị");
  };
  return (
    <Box className="status">
      <DataGrid
        rows={employees}
        disableSelectionOnClick
        columns={windowColumns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: "130px", right: "100px" }}
        onClick={() => {
          setIsEdit({ id: 0, address: "", name: "" });
          setIsOpenPopOver(true);
        }}
      >
        Thêm nhân viên
      </Button>
      <Popover
        onClose={() => {
          setIsOpenPopOver(false);
          setIsEdit({ id: 0, address: "", name: "" });
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
            Thêm người quản lý
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
              <Input></Input>
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
                handleSubmit(isEdit.name, isEdit.address, isEdit.id);
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
    </Box>
  );
};
