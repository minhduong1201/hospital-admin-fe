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
import {
  deleteCustomerFromHospital,
  getCustomers,
  getCustomersWithHeartRate,
} from "../redux/apiCalls";
import { Avatar, Pagination } from "@mui/material";
import { AddNewPopOver } from "../components/AddNewPopover";

export const Customers = (props) => {
  const { setUserChat, accessToken } = props;
  const [isOpenAddNew, setIsOpenAddNew] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const pageSize = 11;
  const startRow = page * pageSize;
  const endRow = startRow + pageSize;
  const hospital = useSelector((state) => state.hospital.hospital);
  const customers = useSelector((state) => state.customers);
  const pageCustomers = customers.slice(startRow, endRow);

  useEffect(() => {
    if (!hospital) return;
    getCustomers(hospital._id, dispatch, accessToken);
  }, []);

  useEffect(() => {
    getCustomersWithHeartRate(pageCustomers, dispatch, accessToken);
  }, [page]);

  const windowColumns = [
    {
      field: "name",
      headerName: "Tên",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    {
      field: "img",
      headerName: "Ảnh",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={params.row.img || ""}
            ></Avatar>
          </div>
        );
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
    // {
    //   field: "address",
    //   headerName: "Địa chỉ",
    //   width: 300,
    //   renderCell: (params) => {
    //     return <div className="productListItem">{params.row.address}</div>;
    //   },
    // },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.phone}</div>;
      },
    },
    {
      field: "heart_rate",
      headerName: "Nhịp tim",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.heart_rate || "Chưa có dữ liệu"}
          </div>
        );
      },
    },
    {
      field: "last_update",
      headerName: "Lần cập nhật cuối",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.last_update || "Chưa có dữ liệu"}
          </div>
        );
      },
    },
    {
      field: "health",
      headerName: "Tình trạng sức khỏe",
      width: 240,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.health}</div>;
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <button
              className="edit"
              onClick={() => {
                setSelectedUser(params.row);
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
        return (
          <ChatIcon
            color="primary"
            onClick={() => setUserChat(params.row)}
            style={{ marginLeft: 10 }}
          />
        );
      },
    },
  ];

  const handleDelete = (id) => {
    deleteCustomerFromHospital(dispatch, id, accessToken);
  };

  return (
    <Box className="status" style={{position: "relative"}}>
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
        style={{ position: "absolute", right: 10, bottom: 10 }}
        count={Math.ceil(customers.length / pageSize)}
        page={page + 1}
        onChange={(event, value) => setPage(value - 1)}
      />
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: "70px", left: "20px" }}
        onClick={() => {
          setIsOpenAddNew(true);
        }}
      >
        Thêm bệnh nhân
      </Button>
      <Button
        color="secondary"
        sx={{ position: "absolute", bottom: "70px", right: "50px" }}
      >
        Tổng số bệnh nhân: {customers.length}
      </Button>
      {selectedUser && (
        <CustomerPopOver
          accessToken={accessToken}
          selectedUser={selectedUser}
          isOpenPopOver={selectedUser}
          setIsOpenPopOver={setSelectedUser}
        />
      )}
      {isOpenAddNew && (
        <AddNewPopOver
          accessToken={accessToken}
          isOpenPopOver={isOpenAddNew}
          setIsOpenPopOver={(value) => setIsOpenAddNew(value)}
          hospital={hospital}
          type="customer"
        />
      )}
    </Box>
  );
};
