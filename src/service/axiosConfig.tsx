import axios from "axios";
import {
  getDataFromLocalStorage,
  valiadteToken,
} from "../components/App/utils/util";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "https://api.isamtree.com/", // "https://run.mocky.io/v3"
  // timeout: 1000,
  // headers: {Authorization: `Bearer ${getTokens("login-auth-token")}`}
});
// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// console.log( process.env.REACT_APP_BASE_URL)
instance.interceptors.request.use((req: any) => {
  if (req.url === "admin/refresh") return req;
  if (valiadteToken()) {
    const token = getDataFromLocalStorage("login-auth-token");
    const auth = token ? `Bearer ${token}` : "";
    req.headers.common["Authorization"] = auth;
  }
  return req;
});

instance.interceptors.response.use((res: any) => {
  try {
    if (res.status === 200 || res.status === 204 || res.status === 202) {
      return res;
    } else if (res.data !== "") {
      toast.error("Somthing went wrong.");
    } else {
      toast.error("Somthing went wrong.");
    }
  } catch (err) {
    toast.error(res.message);
  }
  return res;
});

export default instance;
