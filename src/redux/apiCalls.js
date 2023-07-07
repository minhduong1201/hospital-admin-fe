import { publicRequest, userRequest } from "../requestMethod";
import { postHospitalSuccess } from "./hospitalRedux";
import {
  addCustomer,
  deleteCustomer,
  getCustomersSuccess,
  updateCustomers,
} from "./CustomerRedux";
import { getEmployeesSuccess, addEmployee, deleteEmployee } from "./EmployeesRedux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from "./EmployeeRedux.js";
import { alertError, alertSuccess } from "../utils/tools";

export const register = async (dispatch, user, type) => {
  dispatch(loginStart());

  try {
    await publicRequest.post(`/auth/register/${type}`, user);
    console.log("123");
    alertSuccess(dispatch, "Đăng ký thành công!");
  } catch (err) {
    alertError(dispatch, "Tên đăng nhập hoặc mật khẩu người này đã tồn tại!");
  }
};

export const login = async (dispatch, user, type) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(`/auth/login/${type}`, user);
    dispatch(loginSuccess(res.data));
    localStorage.setItem("TOKEN_INIT", res.data.accessToken);
    alertSuccess(dispatch, "Đăng nhập thành công!");
  } catch (err) {
    dispatch(loginFailure());
    alertError(dispatch, "Vui lòng nhập đúng tên đăng nhập và mật khẩu!");
  }
};

export const getEmployees = async (hospitalId, dispatch, accessToken) => {
  try {
    const res = await userRequest(accessToken).get(`/employees/${hospitalId}`);
    dispatch(getEmployeesSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getCustomersWithHeartRate = async (customers, dispatch, accessToken) => {
  const data = Promise.all(
    customers.map((customer) => userRequest(accessToken).get(`/heart_rate/${customer._id}`))
  )
    .then((list) => {
      const payload = customers.map((customer, index) => ({
        ...customer,
        heart_rate: list[index].data?.value,
        last_update: list[index].data?.createdAt,
      }));
      dispatch(updateCustomers(payload));
    })
    .catch((error) => console.log(error));
  return data;
};

export const getCustomers = async (hospitalId, dispatch, accessToken) => {
  try {
    const res = await userRequest(accessToken).get(`/customers/${hospitalId}`);
    dispatch(getCustomersSuccess(res.data));
  } catch (err) {
    console.log("thất bại");
  }
};

export const updateCurrentUser = async (employee, dispatch, id, accessToken) => {
  try {
    const res = await userRequest(accessToken).put(`/employees/${id}`, employee);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const addNewEmployee = async (employee, dispatch, id, accessToken) => {
  if (id == undefined || id == null) return;
  const res = await userRequest(accessToken).put(`/employees/${id}`, employee);
  if (res.data && 199 < res.status < 300) dispatch(addEmployee(res.data));
};

export const addNewCustomer = async (employee, dispatch, id, accessToken) => {
  if (id == undefined || id == null) return;
  const res = await userRequest(accessToken).put(`/customers/${id}`, employee);
  if (res.data && 199 < res.status < 300) {
    dispatch(addCustomer(res.data));
    alertSuccess(dispatch, "Thêm bệnh nhân thành công!");
  } else {
    alertError(dispatch, "Thêm thất bại!");
  }
};

export const deleteCustomerFromHospital = async (dispatch, id, accessToken) => {
  if (id == undefined || id == null) return;
  const res = await userRequest(accessToken).put(`/customers/${id}`, { hospitalId: null });
  if (res.data && 199 < res.status < 300) {
    dispatch(deleteCustomer(res.data));
    alertSuccess(dispatch, "Xóa bệnh nhân thành công!");
  } else {
    alertError(dispatch, "Xóa bệnh nhân thất bại!");
  }
};

export const deleteEmployeeFromHospital = async (dispatch, id, accessToken) => {
  if (id == undefined || id == null) return;
  const res = await userRequest(accessToken).put(`/employees/${id}`, { hospitalId: null });
  if (res.data && 199 < res.status < 300) {
    dispatch(deleteEmployee(res.data));
    alertSuccess(dispatch, "Xóa nhân viên thành công!");
  } else {
    alertError(dispatch, "Xóa nhân viên thất bại!");
  }
};
