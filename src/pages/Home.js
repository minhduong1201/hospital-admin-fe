import Map, { LngLat, Marker } from "react-map-gl";
import React, { useEffect, useState } from "react";
import { updateEmployee } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Box, width } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { userRequest } from "../requestMethod";
// import { message } from "antd";
import { postHospitalSuccess } from "../redux/hospitalRedux";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const hospital = useSelector(state => state.hospital.hospital);
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(currentUser);

  useEffect(()=>{
    if(!currentUser.hospitalId) return;
    const getHospital = async () => {
    await userRequest.get(`/hospital/${currentUser.hospitalId}`).then(res=>
      dispatch(postHospitalSuccess(res.data)));
    };
    getHospital();
  },[currentUser.hospitalId])
  const HospitalForm = () => {
    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      await userRequest.post(`/hospital`, {name, infor: info, address}).then(res => {
        // message.success("Tạo thành công");
        alert("Tạo thành công")
        dispatch(postHospitalSuccess(res.data));
        console.log(res.data);
        updateEmployee({hospitalId: res.data._id}, dispatch, currentUser._id)
        setLoading(false);
      })
      .catch(err =>{
        //  message.error("tạo thất bại")
      setLoading(false);
    })
      // Xử lý logic khi nhấn nút Submit
      // Gửi dữ liệu tới backend hoặc thực hiện các tác vụ khác tại đây
    };
  
    return (
      <Box component="form" style={{width: "90%"}} onSubmit={handleSubmit}>
        <TextField
          label="Tên bệnh viện"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Thông tin"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button loading={loading} variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    );
  };
  const renderHospitalInfor = () => {
    if (!hospital) return null;
  // get hospital
    return (
      <div style={{ margin: "20px 10px 10px 20px" }}>
        <div>- Mã bệnh viện: {hospital._id}</div>
        <div>- Tên bệnh viện: {hospital.name}</div>
        <div>- Thông tin: {hospital.infor}</div>
        <div>- Địa chỉ: {hospital.address}</div>
      </div>
    );
  };
  const renderNotInHospital = () => {
    return <div style={{height: '100%', width: '100%', margin:"20px 10px 10px 20px"}}>
      <div className = "userid">- Mã người dùng: {currentUser._id}</div>
      <div>- Nhập mã này tại trang web quản lý của bệnh viện đã có hoặc tạo mới bệnh viện tại đây:</div>
      {HospitalForm()}
    </div>
  }

  return <div style={{height: "100%", width: "100%"}}>
    {!currentUser.hospitalId 
    ? renderNotInHospital()
    : renderHospitalInfor()}
    </div>;
};

export default Home;