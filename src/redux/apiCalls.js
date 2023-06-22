import { publicRequest, userRequest } from "../requestMethod";
import { postHospitalSuccess } from "./hospitalRedux";
import { addCustomer, getCustomersSuccess, updateCustomers } from "./CustomerRedux";
import { getEmployeesSuccess, addEmployee } from "./EmployeesRedux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from "./EmployeeRedux.js";

export const register = async (dispatch, user, type) => {
  dispatch(loginStart());

  try {
    await publicRequest.post(`/auth/register/${type}`, user);
    alert("Đăng ký thành công!");
  } catch (err) {
    alert("Tên đăng nhập và mật khẩu này đã tồn tại!");
  }
};

export const login = async (dispatch, user, type) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(`/auth/login/${type}`, user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    alert("Đăng nhập thành công!");
  } catch (err) {
    dispatch(loginFailure());
    alert("Vui lòng nhập đúng tên đăng nhập và mật khẩu!");
  }
};

export const getEmployees = async (hospitalId, dispatch) => {
  try {
    const res = await userRequest.get(`/employees/${hospitalId}`);
    console.log(res);

    dispatch(getEmployeesSuccess(res.data));
  } catch (err) {
    console.log("thất bại");
  }
};

export const getCustomersWithHeartRate = async (customers, dispatch) => {
  const data = Promise.all(
    customers.map((customer) => userRequest.get(`/heart_rate/${customer._id}`))
  )
    .then((list) => {
      console.log(list);
      const payload = customers.map((customer, index) => ({
        ...customer,
        heart_rate: list[index].data?.value,
        last_update: list[index].data?.createdAt,
      }));
      console.log(payload);
      dispatch(updateCustomers(payload));
    })
    .catch((error) => console.log(error));
  return data;
};

export const getCustomers = async (hospitalId, dispatch) => {
  try {
    const res = await userRequest.get(`/customers/${hospitalId}`);
    const data = res.data;
    console.log(data);

    dispatch(getCustomersSuccess(res.data));
  } catch (err) {
    console.log("thất bại");
  }
};

export const updateCurrentUser = async (employee, dispatch, id) => {
  try {
    const res = await userRequest.put(`/employees/${id}`, employee);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const addNewEmployee = async (employee, dispatch, id) => {
  if (id == undefined || id == null) return;
  const res = await userRequest.put(`/employees/${id}`, employee);
  if (res.data && 199 < res.status < 300) dispatch(addEmployee(res.data));
};

export const addNewCustomer = async (employee, dispatch, id) => {
  if (id == undefined || id == null) return;
  const res = await userRequest.put(`/customers/${id}`, employee);
  if (res.data && 199 < res.status < 300) dispatch(addCustomer(res.data));
};



