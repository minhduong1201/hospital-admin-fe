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

export const Status = () => {
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const [isEdit, setIsEdit] = useState({id:0,address:'',name:''});
  const dispatch = useDispatch();
  const bins = useSelector((state: any) => state.bins.bins);
  useEffect(() => {
    getBins(dispatch);
  }, []);

  const windowColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "name",
      width: 200,
      renderCell: (params: any) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "total",
      headerName: "Status",
      width: 200,
      renderCell: (params: any) => {
        return <div className="productListItem">{params.row.total[0]}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
              <button className="edit" onClick={
                ()=>{
                  setIsOpenPopOver(true);
                  setIsEdit({id:params.row._id,address:params.row.address,name:params.row.name});}}>Edit</button>
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
    deleteBin(id,dispatch);
    alert("Xóa thành công!");
  };
  const handleSubmit=(name: any,address: any, long:any, lat: any)=>{
    console.log('add bin')
    if(name&&address)
    addBin({name,address,long, lat,    
    organics : [0],
    inorganics : [0],
    recyclables : [0]},dispatch);
    else alert("Vui lòng nhập đủ giá trị");
  }
  const handleSubmitEdit=(name: any,address: any, long: any, lat: any, id:number)=>{
    console.log(name);
    console.log(address);
    console.log(id)
    if(name&&address&&id){
      updateBin({name,address,long, lat, id},dispatch);
    }
    else alert("Vui lòng nhập đủ giá trị");
  }
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
        onClick={
          () => {
            setIsEdit({id:0,address:'',name:''});
            setIsOpenPopOver(true)}}
      >
        Thêm thùng rác
      </Button>
      <CustomPopOver isOpenPopOver={isOpenPopOver} isEdit={isEdit} setIsEdit={setIsEdit} setIsOpenPopOver={setIsOpenPopOver} handleSubmit={isEdit.id?handleSubmitEdit:handleSubmit}/>
    </Box>
  );
};
