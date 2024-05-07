import { changePasswordType } from "@/types/auth.type";
import { API } from "@/utils/config";
import { errorMessage } from "@/utils/errorMessages";
import { authHeader } from "@/utils/token";
import axios from "axios";
import { toast } from "react-toastify";

export const HandleLogin = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${API.login}`,
    data: reqData,
    headers: authHeader(),
  })
    .then((request: any) => {
      return request;
    })
    .catch((error: any) => {
      if (error?.message === "Network Error") {
        toast.error(errorMessage.loginNetworkError);
      } else if (error?.response?.status === 401) {
        toast.error(error?.response?.data?.message);
      } else if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.message);
      }
      return error;
    });
};

export const HandleChangepassword = async (
  reqData: changePasswordType,
  userId: number
) => {
  const userpassword = {
    old_password: reqData.old_password,
    password: reqData?.password,
  };
  return await axios({
    method: "PUT",
    url: `${API.changePassword}/${userId}`,
    data: userpassword,
    headers: authHeader(),
  })
    .then((request: any) => {
      return request;
    })
    .catch((error: any) => {
      if (error.response.status === 401) {
        HandleLogout();
      }
      return error;
    });
};

export const HandleLogout = () => {
  localStorage.clear();
  window.location.replace("/login");
};

export const localStorageGetter = (getString: string) => {
  let getToken;

  if (typeof window !== "undefined") getToken = localStorage.getItem(getString);

  return getToken;
};

export const localStorageSetter = (setString: string, setData: any) => {
  let getToken;

  if (typeof window !== "undefined")
    getToken = localStorage.setItem(setString, setData);

  return getToken;
};
