import {
  Popover,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Map, { LngLat, Marker } from "react-map-gl";
import { getAddress } from "../redux/apiCalls";
import { geoCodingRequest } from "../requestMethod";
interface ICustomPopOver {
  isOpenPopOver: boolean;
  setIsOpenPopOver: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (name: any, address: any, long:any, lat:any, id?: any) => void;
  isEdit: { name: string; address: string; id: number };
  setIsEdit: React.Dispatch<
    React.SetStateAction<{
      id: number;
      address: string;
      name: string;
    }>
  >;
}
export const CustomPopOver = ({
  isOpenPopOver,
  setIsOpenPopOver,
  handleSubmit,
  isEdit,
  setIsEdit,
}: ICustomPopOver) => {
  const [LongLat, setLongLat] = useState({ lng: 105.844, lat: 21.005 });
  let token =
    "pk.eyJ1IjoiaGVsbG93b3JsZDIwMDEiLCJhIjoiY2xibHpxbG1lMGNkdzNvbDkyajh6cDViOCJ9.4_YKoVFcV2SMHCZ73YwpLA";
  const handleClickMap = (e: any) => {
    setLongLat({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    const getAddress = async (long: any, lat: any, token: any, lan: any) => {
      try {
        await geoCodingRequest
          .get(`/${long},${lat}.json?types=poi&access_token=${token}`)
          .then((res) => {
            console.log(
              res.data
            );
            setIsEdit({
              ...isEdit,
              address:  res.data.features[0].place_name
              .split(",")
              .reduce((prev: any, curr: any, index: number) => {
                if (
                  index >=
                  res.data.features[0].place_name.split(",").length - 2
                )
                  return prev;
                return prev + curr;
              })
            });
          });
      } catch (err) {
        console.log(err);
      }
    };
    getAddress(e.lngLat.lng, e.lngLat.lat, token, "ja");
  };
  return (
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
          Tạo thùng rác
          <DeleteIcon
            color="primary"
            sx={{ position: "absolute", top: "10px" }}
          />
        </Typography>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="name"
            label="name"
            onChange={(e) => setIsEdit({ ...isEdit, name: e.target.value })}
            defaultValue={isEdit?.name}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            style={{ fontWeight: 700 }}
            disabled
            id="address"
            onChange={(e) => setIsEdit({ ...isEdit, address: e.target.value })}
            value={isEdit?.address}
          />
        </FormControl>
        <Map
          initialViewState={{
            longitude: 105.84,
            latitude: 21,
            zoom: 14,
          }}
          style={{ width: 500, height: 300, margin: "0 auto" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={token}
          onClick={handleClickMap}
        >
          <Marker
            longitude={LongLat.lng}
            latitude={LongLat.lat}
            color="red"
            anchor="center"
          />
        </Map>
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
              handleSubmit(
                isEdit.name,
                isEdit.address,
                LongLat.lng,
                LongLat.lat,
                isEdit.id,
              );
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
  );
};
