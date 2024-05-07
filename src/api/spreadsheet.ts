import {
  saveSpreadSheetDataType,
  spreadSheetLinkType,
  updateTimeSheetDataType,
} from "@/types/spreadSheet.type";
import { API } from "@/utils/config";
import { authHeader } from "@/utils/token";
import axios from "axios";
import { HandleLogout } from "./auth";

export const readSpreadSheet = async () => {
  return await axios({
    method: "GET",
    url: `${API.readSpreadSheetLink}`,
    headers: {
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6Im1hbmlzaHVuZGVmaW5lZCIsImVtYWlsIjoibWFuaXNoQGdtYWlsLmNvbSIsImlhdCI6MTcxMjMwNDE4OSwiZXhwIjoxNzEyMzE4NTg5fQ.BuepD4fLcbcndZRadBtt2BAIs80bJbIY8ZY77RbYJ20",
    },
  })
    .then((request: any) => {
      return request;
    })
    .catch((error: any) => {
      return error;
    });
};

export const saveSpreadSheetLink = async (reqData: spreadSheetLinkType) => {
  return await axios({
    method: "POST",
    url: `${API.saveSpreadSheetLink}`,
    data: reqData,
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

export const deleteTimeSheetdata = async (date: any) => {
  return await axios({
    method: "DELETE",
    url: `${API.deleteTimesheetdata}/${date}`,
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

export const saveSpreadSheetData = async (
  reqData: saveSpreadSheetDataType[]
) => {
  return await axios({
    method: "POST",
    url: `${API.saveTimesheetData}`,
    data: reqData,
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

export const readSpreadSheetNames = async (reqData: spreadSheetLinkType) => {
  return await axios({
    method: "POST",
    url: `${API.readSpreadSheetNames}`,
    data: reqData,
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

export const updateTimeSheetData = async (
  reqData: updateTimeSheetDataType[]
) => {
  return await axios({
    method: "PUT",
    url: `${API.updateTimeSheetData}`,
    data: reqData,
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

export const getSpreadSheetData = async () => {
  return await axios({
    method: "GET",
    url: `${API.getTimesheetData}`,
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

export const getConfigurationDetailsApi = async () => {
  return await axios({
    method: "GET",
    url: `${API.getConfigurationsDetails}`,
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
