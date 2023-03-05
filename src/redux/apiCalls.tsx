import { publicRequest, userRequest, geoCodingRequest } from "../requestMethod";
import {
  getBinStart,
  getBinSuccess,
  getBinFailure,
  deleteBinSuccess,
} from "./binRedux";
import {
  getBinsStart,
  getBinsSuccess,
  getBinsFailure,
  addBinsFailure,
  addBins,
  deleteBinsSuccess,
  updateBinsSuccess
} from "./binsRedux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from "./userRedux";

export const register = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(loginSuccess(res.data));
    alert("Đăng ký thành công!")
  } catch (err) {
    dispatch(loginFailure());
    alert("Tên đăng nhập và mật khẩu này đã tồn tại!")
  }
};

export const login = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data)
    dispatch(loginSuccess(res.data));
    alert("Đăng nhập thành công!")
  } catch (err) {
    dispatch(loginFailure());
    alert("Vui lòng nhập đúng tên đăng nhập và mật khẩu!")
  }
};

export const getBins = async (dispatch: any) => {
  dispatch(getBinsStart());
  console.log('get bin')
  try {
    const res = await userRequest.get("/bin");
    console.log(res)
    dispatch(getBinsSuccess(res.data));
  } catch (err) {
    console.log(err)
    dispatch(getBinsFailure());
  }
};

export const getBin = async (id: any, dispatch: (arg0: any) => void) => {
  dispatch(getBinStart());
  try {
    const res = await userRequest.get(`/bin/${id}`);
    dispatch(getBinSuccess(res.data));
  } catch (err) {
    dispatch(getBinFailure());
  }
};

export const addBin = async (bin: any, dispatch: (arg0: any) => void) => {
  try {
    const res = await userRequest.post(`/bin/`, bin);
    console.log(res.data);
    dispatch(addBins(res.data));
  } catch (err) {
    dispatch(addBinsFailure());
  }
};

export const deleteBin = async (id: number, dispatch: (arg0: any) => void) => {
  try {
    const listIds = {ids:[id]}
    await userRequest.post(`/bin/delete-bins-by-ids`, listIds);
    dispatch(deleteBinsSuccess(id));
  } catch (err) {
    console.log(err);
  }
};

export const updateBin = async (bin:any, dispatch: (arg0: any) => void) => {
  try {
    const res = await userRequest.put(`/bin/${bin.id}`,bin);
    dispatch(updateBinsSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getAddress=async (long: any,lat: any,token: any,lan: any, result:any) => {
  try {
    const res = await geoCodingRequest.get(`/${long},${lat}?language=${lan}&access_token=${token}`);
    result=res.data.features[0].properties.feature_name;
  } catch (err) {
    console.log(err);
  }
};