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
  const [isEdit, setIsEdit] = useState({id:0,address:'',title:'',weight:0});
  const dispatch = useDispatch();
  const bins = useSelector((state: any) => state.bins.bins);
  useEffect(() => {
    getBins(dispatch);
  }, []);

  const windowColumns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params: any) => {
        return <div className="productListItem">{params.row.title}</div>;
      },
    },
    { field: "address", headerName: "Adress", width: 200 },
    { field: "weight", headerName: "Weight", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
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
                  setIsEdit({id:params.row.id,address:params.row.address,title:params.row.title,weight:params.row.weight});}}>Edit</button>
            <IconButton className="delete">
              <DeleteIcon
                color="primary"
                className=""
                onClick={() => handleDelete(params.row.id)}
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
  const handleSubmit=(title: any,weight: any,address: any)=>{
    if(title&&address&&weight)
    addBin({title,weight,address,status:"empty"},dispatch);
    else alert("Vui lòng nhập đủ giá trị");
  }
  const handleSubmitEdit=(title: any,weight: any,address: any,id:number)=>{
    console.log(title,address,weight,id);
    if(title&&address&&weight&&id){
      updateBin({title,weight,address,status:"empty",id},dispatch);
    }
    else alert("Vui lòng nhập đủ giá trị");
  }
  return (
    <Box className="status">
      <DataGrid
        rows={bins}
        disableSelectionOnClick
        columns={windowColumns}
        getRowId={(row) => row.id}
        pageSize={8}
        checkboxSelection
      />
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: "130px", right: "100px" }}
        onClick={
          () => {
            setIsEdit({id:0,address:'',title:'',weight:0});
            setIsOpenPopOver(true)}}
      >
        Thêm thùng rác
      </Button>
      <CustomPopOver isOpenPopOver={isOpenPopOver} isEdit={isEdit} setIsEdit={setIsEdit} setIsOpenPopOver={setIsOpenPopOver} handleSubmit={isEdit.id?handleSubmitEdit:handleSubmit}/>
    </Box>
  );
};
