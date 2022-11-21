import axios from "axios";
import { REFRESH } from "../../../service/apiEndPoints";

export const saveDataToLocalStorage = (key = "", user = {}) => {
  window.localStorage.setItem(key, JSON.stringify(user));
};

export const getDataFromLocalStorage = (key = "") => {
  let data = {};
  if (key) {
    data = JSON.parse(window.localStorage.getItem(key) || "{}");
  }
  return data;
};

export const removeDataFromLocalStorage = (key = "") => {
  if (key) {
    window.localStorage.removeItem(key);
  }
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};

export const valiadteToken = () => {
  const token = getDataFromLocalStorage("login-auth-token");
  const isLoggedIn = getDataFromLocalStorage("isLoggedIn");
  if (
    ["/", "/samwatch", "/samtheme", "/samstudio"].includes(
      window.location.pathname
    )
  ) {
    return false;
  }
  if (token && isLoggedIn) {
    return true;
  }
  return false;
};

export const refreshToken = async (): Promise<Boolean> => {
  const reqPayload = {
    refresh_token: getDataFromLocalStorage("refresh-token"),
    email: getDataFromLocalStorage("email"),
  };
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${REFRESH}`,
      reqPayload
    );
    saveDataToLocalStorage("login-auth-token", data?.data?.AccessToken);
    saveDataToLocalStorage("refresh-token", data?.data?.RefreshToken);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
