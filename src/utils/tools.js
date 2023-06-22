import { updateAlert } from "../redux/alertRedux";

export const alertSuccess = (dispatch, message) => {
  dispatch(updateAlert({message, severity: "success"}));
}

export const alertError = (dispatch, message) => {
  dispatch(updateAlert({message, severity: "error"}));
}