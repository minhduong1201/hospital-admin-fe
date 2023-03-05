import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBin, deleteBin, getBins, updateBin } from "../redux/apiCalls";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CustomPopOver } from "../components/CustomPopOver";
import axios from "axios";
const arr = [
  "https://image.vtc.vn/files/thutla/2019/04/22/101925-dai-hoc-kinh-te-quoc-dan-1-1140223.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6ydRIrVChYDi6wHIWcpTM_tpYxvG3COj9w&usqp=CAU",
  "https://betongnhuaasphalt.com/wp-content/uploads/2021/05/tham-duong-khu-noi-bo-dieu-tri-cong-nghe-cao-bach-mai-e1622107355209.jpg",
  "http://hanoimoi.com.vn/Uploads/images/phananh/2021/02/06/hanoi1.jpg",
  "https://newsmd2fr.keeng.net/tiin/archive/images/20211128/112050_a.jpg",
  "https://mapio.net/images-p/35546530.jpg",
];
const a = Math.random();
console.log(a);

export const Status = () => {
  const index = Math.round(Math.random()*5);
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const [isEdit, setIsEdit] = useState({ id: 0, address: "", name: "" });
  const dispatch = useDispatch();
  const bins = useSelector((state: any) => state.bins.bins);
  useEffect(() => {
    getBins(dispatch);
  }, []);

  const windowColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Tên",
      width: 100,
      renderCell: (params: any) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 300,
      renderCell: (params: any) => {
        return (
          <div className="productListItem">
            <img
              style={{ width: 40, height: 40, margin: 10 }}
              src={params.row.image}
            ></img>
            {params.row.address}
          </div>
        );
      },
    },
    {
      field: "organic",
      headerName: "Hữu cơ",
      width: 100,
      renderCell: (params: any) => {
        return <div className="productListItem">{isNaN(params.row.organic)?0:params.row.organic} %</div>;
      },
    },
    {
      field: "inorganic",
      headerName: "Vô cơ",
      width: 100,
      renderCell: (params: any) => {
        return <div className="productListItem">{isNaN(params.row.inorganic)?0:params.row.inorganic} %</div>;
      },
    },
    {
      field: "recyclable",
      headerName: "Tái chế",
      width: 100,
      renderCell: (params: any) => {
        return <div className="productListItem">{isNaN(params.row.recyclable)?0:params.row.recyclable} %</div>;
      },
    },
    {
      field: "total",
      headerName: "Tổng",
      width: 100,
      renderCell: (params: any) => {
        console.log(
          isNaN(
            params.row.organic + params.row.inorganic + params.row.recyclable
          )
        );
        const value = isNaN(
          params.row.organic + params.row.inorganic + params.row.recyclable
        )
          ? 0
          : params.row.organic + params.row.inorganic + params.row.recyclable;
        return <div className="productListItem">{Math.round(value / 3)} %</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => {
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
              Edit
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

  const handleDelete = (id: any) => {
    deleteBin(id, dispatch);
    alert("Xóa thành công!");
  };
  const handleSubmit = (name: any, address: any, long: any, lat: any) => {
    console.log("add bin");
    if (name && address)
      addBin(
        {
          name,
          address,
          long,
          lat,
          status: '0',
          image: arr[index]
        },
        dispatch
      );
    else alert("Vui lòng nhập đủ giá trị");
  };
  const handleSubmitEdit = (
    name: any,
    address: any,
    long: any,
    lat: any,
    id: number
  ) => {
    console.log(name);
    console.log(address);
    console.log(id);
    if (name && address && id) {
      updateBin({ name, address, long, lat, id }, dispatch);
    } else alert("Vui lòng nhập đủ giá trị");
  };
  return (
    <Box className="status">
      <DataGrid
        rows={bins}
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
        Thêm thùng rác
      </Button>
      <CustomPopOver
        isOpenPopOver={isOpenPopOver}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setIsOpenPopOver={setIsOpenPopOver}
        handleSubmit={isEdit.id ? handleSubmitEdit : handleSubmit}
      />
    </Box>
  );
};
