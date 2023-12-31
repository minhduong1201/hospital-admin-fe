import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEmployeeFromHospital, getEmployees } from "../redux/apiCalls";
import { AddNewPopOver } from "../components/AddNewPopover";
import { Avatar, Popover, Typography } from "@mui/material";

export const Employees = (props) => {
  const { accessToken } = props;
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const dispatch = useDispatch();
  const hospital = useSelector((state) => state.hospital.hospital);
  const employees = useSelector((state) => state.employees);
  useEffect(() => {
    if (!hospital) return;
    getEmployees(hospital._id, dispatch, accessToken);
  }, []);

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
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.phone}</div>;
      },
    },

    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.email}</div>;
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
            <IconButton className="delete">
              <DeleteIcon
                color="primary"
                className=""
                onClick={() => setDeleteUser(params.row._id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  const renderDeletePopOver = () => {
    return (
      <Popover
        id={"popover-delete"}
        open={deleteUser}
        onClose={() => setDeleteUser(null)}
        anchorPosition={{ top: 400 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography>Xóa người dùng ra khỏi bệnh viện?</Typography>
          <Button onClick={handleDelete} variant="contained" sx={{ mr: 1 }}>
            OK
          </Button>
          <Button onClick={() => setDeleteUser(null)} variant="outlined">
            Hủy
          </Button>
        </Box>
      </Popover>
    );
  };
  const handleDelete = () => {
    deleteEmployeeFromHospital(dispatch, deleteUser, accessToken).then((res) =>
      setDeleteUser(null)
    );
  };

  return (
    <Box className="status" style={{ position: "relative" }}>
      <DataGrid
        rows={employees}
        disableSelectionOnClick
        columns={windowColumns}
        getRowId={(row) => row._id}
        pageSize={11}
        checkboxSelection
      />
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: "70px", left: "20px" }}
        onClick={() => {
          setIsOpenPopOver(true);
        }}
      >
        Thêm nhân viên
      </Button>
      <Button
        color="secondary"
        sx={{ position: "absolute", bottom: "70px", right: "50px" }}
      >
        Tổng số nhân viên: {employees.length}
      </Button>
      <AddNewPopOver
        accessToken={accessToken}
        isOpenPopOver={isOpenPopOver}
        setIsOpenPopOver={(value) => setIsOpenPopOver(value)}
        hospital={hospital}
        type="employee"
      />
      {deleteUser && renderDeletePopOver()}
    </Box>
  );
};
