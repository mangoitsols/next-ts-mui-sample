import { API } from "@/utils/config";
import { authHeader } from "@/utils/token";
import axios from "axios";
import { HandleLogout } from "./auth";

export const getDashboardDetails = async () => {
  return await axios({
    method: "POST",
    url: `${API.getDashboardData}`,
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
