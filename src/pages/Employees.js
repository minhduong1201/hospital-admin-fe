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
import { Avatar } from "@mui/material";

export const Employees = () => {
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const dispatch = useDispatch();
  const hospital = useSelector((state) => state.hospital.hospital);
  const employees = useSelector((state) => state.employees);
  useEffect(() => {
    if (!hospital) return;
    getEmployees(hospital._id, dispatch);
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
                onClick={() => handleDelete(params.row._id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    deleteEmployeeFromHospital(dispatch, id);
  };

  return (
    <Box className="status">
      <DataGrid
        rows={employees}
        disableSelectionOnClick
        columns={windowColumns}
        getRowId={(row) => row._id}
        pageSize={12}
        checkboxSelection
      />
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: "130px", right: "100px" }}
        onClick={() => {
          setIsOpenPopOver(true);
        }}
      >
        Thêm nhân viên
      </Button>
      <AddNewPopOver
        isOpenPopOver={isOpenPopOver}
        setIsOpenPopOver={(value) => setIsOpenPopOver(value)}
        hospital={hospital}
        type="employee"
      />
    </Box>
  );
};
