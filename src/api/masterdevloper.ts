import { masterDevType } from "@/types/masterDeveloper.type";
import { API } from "@/utils/config";
import { authHeader } from "@/utils/token";
import axios from "axios";
import { HandleLogout } from "./auth";

export const CreatemasterDeveloper = async (reqData: masterDevType) => {
  return await axios({
    method: "POST",
    url: `${API.createMasterdeveloper}`,
    data: reqData,
    headers: authHeader(),
  })
    .then((request: any) => {
      return request;
    })
    .catch((error: any) => {
      if (error?.response?.status === 401) {
        HandleLogout();
      }
      return error;
    });
};

export const UpdatemasterDeveloper = async (id: number) => {
  return await axios({
    method: "PUT",
    url: `${API.updateMasterdeveloper}/${id}`,
    headers: authHeader(),
  })
    .then((request: any) => {
      return request;
    })
    .catch((error: any) => {
      if (error?.response?.status === 401) {
        HandleLogout();
      }
      return error;
    });
};

export const getDeveloper = async () => {
  return await axios({
    method: "GET",
    url: `${API.getDeveloper}`,
    headers: authHeader(),
  })
    .then((request: any) => {
      return request;
    })
    .catch((error: any) => {
      if (error?.response?.status === 401) {
        HandleLogout();
      }
      return error;
    });
};
