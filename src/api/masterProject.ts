import { masterDevType } from "@/types/masterDeveloper.type";
import { masterProjectType } from "@/types/masterProject.type";
import { API } from "@/utils/config";
import { authHeader } from "@/utils/token";
import axios from "axios";
import { HandleLogout } from "./auth";

export const CreatemasterProject = async (reqData: masterProjectType) => {
  return await axios({
    method: "POST",
    url: `${API.createMasterProject}`,
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

export const getProjects = async () => {
  return await axios({
    method: "GET",
    url: `${API.getProject}`,
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
