import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addBin, deleteBin, getBins, updateBin } from "../redux/apiCalls";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteIcon from "@mui/icons-material/Delete";

import { CustomerPopOver } from "../components/CustomerPopOver";
import { getCustomers, getCustomersWithHeartRate } from "../redux/apiCalls";
import { Pagination } from "@mui/material";
import Chat from "../components/Chat";
import { AddNewPopOver } from "../components/AddNewPopover";

export const Customers = (props) => {
  const {selectedUser, setSelectedUser} = props;
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const [isOpenAddNew, setIsOpenAddNew] = useState(false);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const pageSize = 4;
  const startRow = page * pageSize;
  const endRow = startRow + pageSize;
  const hospital = useSelector((state) => state.hospital.hospital)
  const customers = useSelector((state) => state.customers);
  const pageCustomers = customers.slice(startRow, endRow);
  useEffect(() => {
    if(!hospital) return;
    getCustomers(hospital._id, dispatch);
  }, []);

  useEffect(() => {
    getCustomersWithHeartRate(pageCustomers, dispatch);
  }, [page])
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
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 300,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.address}</div>;
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
      field: "heart_rate",
      headerName: "Nhịp tim",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.heart_rate || "Chưa có dữ liệu"}</div>;
      },
    },
    {
      field: "last_update",
      headerName: "Lần cập nhật cuối",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.last_update || "Chưa có dữ liệu"}</div>;
      },
    },
    {
      field: "health",
      headerName: "Tình trạng sức khỏe",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.health}</div>;
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
                setTimeout(()=>{
                  setIsOpenPopOver(true);
                })
                setSelectedUser(params.row)
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
    {
      field: "chat",
      headerName: "Chat",
      width: 100,
      renderCell: (params) => {
        return <ChatIcon color="primary" onClick={() => setVisible(params.row)} style={{ marginLeft: 10 }} />;
      },
    },
  ];

  const handleDelete = (id) => {
    // deleteBin(id, dispatch);
    alert("Xóa thành công!");
  };
  return (
    <Box className="status">
      <DataGrid
        rows={pageCustomers}
        disableSelectionOnClick
        columns={windowColumns}
        getRowId={(row) => row._id}
        pageSize={pageSize}
        hideFooter
        checkboxSelection
      />
      <Pagination
        style={{position: "absolute", right: 10, bottom: 10}}
        count={Math.ceil(customers.length / pageSize)}
        page={page + 1}
        onChange={(event, value) => setPage(value - 1)}
      />
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: "130px", right: "100px" }}
        onClick={() => {
          setIsOpenAddNew(true);
        }}
      >
        Thêm bệnh nhân
      </Button>
      {selectedUser && <CustomerPopOver
        selectedUser = {selectedUser}
        isOpenPopOver={selectedUser}
        setIsOpenPopOver={setIsOpenPopOver}
      />}
      {isOpenAddNew && <AddNewPopOver isOpenPopOver={isOpenAddNew} setIsOpenPopOver={(value) => setIsOpenAddNew(value)} hospital={hospital} type="customer"/>}
      {visible && <Chat hospital={hospital} user={visible} visible = {visible} onClose = {() => setVisible(false)}/>}
    </Box>
  );
};
